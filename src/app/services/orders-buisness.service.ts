import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from './order.service';
import { InvRMService } from './inv-rm.service';
import { InvFPService } from './inv-fp.service';
import { ShopOrderService } from './shop-order.service';
import { AuditService } from './audit.service';
import { invFinishedProduct } from '../models/inventory/invFinishedProduct.model';
import { InvRawMaterial } from '../models/inventory/invRawMaterial.model';
import { AuthService } from './auth.service';
import { Orders } from '../models/inventory/orders.model';
import { Timestamp } from 'firebase/firestore'
import { Observable,  forkJoin, from, map, merge, mergeMap, of, switchMap, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersBuisnessService {


  reqMaterials:any[] = []
  materials:any[] = []
  orderProducts:any[] = []
  order:any = new Orders()
  
  constructor(private invFP: InvFPService ,private invrmService: InvRMService ,private orderService: OrderService,private router: Router, private shopService: ShopOrderService, private auditService: AuditService, private auth: AuthService) { }

  
  updateProviderMaterialStock():Observable<any[]>{
    if(!this.materials) return of<InvRawMaterial[]>([]);

     return forkJoin(Array.from(Object.entries(this.materials)).map( m => this.invrmService.getStock(m[0]).pipe(
              map(stock => {
                
                if(!(stock.available!=undefined && stock.commited!=undefined && stock.wating!=undefined && stock.watingCommited!=undefined)) return {}
                
                var req = Math.max(0, (m[1].quantity - stock.available))
                var request = !!(req > 0);                
                var stockUp = {
                  commited: (+stock.commited) + Math.min(stock.available, m[1].quantity), //There is something Available take it 
                  available: Math.max(0, (+stock.available) - m[1].quantity),  // If there is spare save it in available otherwise available is 0
                  watingCommited: (+stock.watingCommited) + Math.max(0, m[1].quantity - stock.available), // The negative difference of available is on watting commited                   
                } 

                return {matId:m[0], name:m[1].name, quantity: m[1].quantity, id: stock.id, oldStock: stock, newStock: stockUp, requestMaterial: request, requested: req}
              })
            )
        )
      )
  } 

  
  initMaterialOrder(){
    this.reqMaterials.forEach(mat => {
      var amount = mat.requested < mat.minBatch ? mat.minBatch - mat.requested: 0;
      mat.newStock.wating += +(amount)
      mat.amount = amount
    })
  }

  
  assignProvider(currentIndex:number, currentProvider:any){
    this.reqMaterials[currentIndex].minBatch = currentProvider.minBatch
    this.reqMaterials[currentIndex].deliveryTime = currentProvider.deliveryTime
    this.reqMaterials[currentIndex].price = currentProvider.price
    alert('Provedor asignado satisfactoriamente')
  }

  
  getOrderWaitMaxTime() {
    return Math.max(...this.reqMaterials.map(e=>e.deliveryTime))
  }


  getTotalPrice(){
    console.log('AAAA')
    var a =  this.orderProducts.reduce((total, p) => {
      if(p.currency == 'mxn'){
        total['mxn'] = total['mxn'] ?  total['mxn']  + (p.price*p.quantity) : (p.price*p.quantity) 
      }else{
        total['usd'] = total['usd'] ?  total['usd']  + (p.price*p.quantity): (p.price*p.quantity) 
      } 
      return total;
    }, [])

    this.order.total = a;
  }

  getTotalMaterials(){
    if(!this.orderProducts) {this.materials = []; return;}

    this.orderProducts.forEach(e => e.materials.forEach((el:any) => el.quantity *= e.quantity ))

    this.materials =  this.orderProducts.flatMap( e => e.materials).reduce((pv, e)=> {
      pv[e.id] = pv[e.id] ? {name: e.name, quantity: pv[e.id].quantity + e.quantity} :  {name: e.name, quantity: e.quantity};
      return pv;
    }, {})
  }


  async useFP(pId:string, index:number){
    if(this.orderProducts[index].stock){
      this.orderProducts[index].available = this.orderProducts[index].available ? undefined : this.orderProducts[index].stock.available
      return
    } 
    var stock = await this.invFP.getStock(pId) || 0
    this.orderProducts[index].available = stock.available
    this.orderProducts[index].stock = stock
  }

  updateOrderProductStock(){
    this.orderProducts.forEach(async (p)=>{
      var stockUp;
      if(p.useFP){
        stockUp = {
          available: Math.max(0, p.stock.available - p.quantity),
          commited: +(p.stock.commited) + Math.min(p.quantity,p.stock.available),
          wating: +(p.stock.wating) + Math.max(0, p.quantity - p.stock.available)
        }
      }else{
        if(!p.stock){
          p.stock = await this.invFP.getStock(p.id) || 0
        }
        stockUp = {
          wating: +(p.stock.wating ) + +(p.quantity)
        }
      }
      p.newStock = stockUp
    })
  }


  updateProductStock():Observable<any>{
    return from(this.orderProducts).pipe(
      mergeMap(p =>
        forkJoin([
          this.invFP.update(p.stock.id, p.newStock),
          this.makeProdStockReport(p.id, p.name, p.stock, p.newStock)
        ])
      )
    )
  }


  updateMaterialStock(orderId:string, orderCode:string):Observable<any>{
    console.log(orderId)

    var req$ =  from(this.reqMaterials).pipe(
      mergeMap(m =>
        forkJoin([
          this.shopService.create(m.matId,m.name,m.requested + m.amount, m.amount, Timestamp.fromDate(new Date(this.order?.rmOrderDeadline)),  m.id, (m.requested + m.amount)*m.price, orderId),
          this.invrmService.update(m.id, m.newStock),
          this.makeMatStockReport(m.matId, m.name, m.oldStock, m.newStock)     
        ])
      )
    )
    
    var mat$ = from(this.materials).pipe(
      mergeMap( m =>
        forkJoin([
            this.invrmService.update(m.id, m.newStock),
            this.makeMatStockReport(m.matId, m.name, m.oldStock, m.newStock) //Tddo Report Service Create report
          ])  
      )
    )

    return merge(req$, mat$) 
  } 

  makeProdStockReport(id:string, name:string, oldStock: any, newStock:any): Observable<any>{
    return this.auditService.create(invFinishedProduct.name, `Actualizacion Stock de Producto: ${name}`, this.auth.username,JSON.stringify(newStock),JSON.stringify(oldStock) , id)
  }

  makeMatStockReport(id:string, name:string, oldStock: any, newStock:any): Observable<any>{
    return this.auditService.create(InvRawMaterial.name, `Actualizacion Stock de Material: ${name}`, this.auth.username, JSON.stringify(newStock), JSON.stringify(oldStock), id)
  }

  editProducts():Observable<any>{

    var products = this.orderProducts.map(e => ({id: e.id, invId: e.invId, name: e.name, quantity: e.quantity}))

    var state = this.reqMaterials.length == 0 ? 'EN PRODUCCION': 'ESPERANDO MATERIAL' 

    return this.orderService.create({
      orderProducts: products, 
      state: state, 
      orderMaterials: this.materials.concat(this.reqMaterials).map(e=> ({matId: e.matId, quantity: e.quantity})),
      timestamp:  Timestamp.fromDate(new Date()), ...this.order
    }).pipe(
      take(1),
      switchMap(order => merge(this.updateMaterialStock(order.id, order.name ?? ''), this.updateProductStock())),
      tap({
        error: e => {console.log(e); alert('Ha ocurrido un error intente de nuevo.')},
        complete: () => {alert('Orden Creada correctamente'); console.log('ENDED');}
      })
    )
  }

}
