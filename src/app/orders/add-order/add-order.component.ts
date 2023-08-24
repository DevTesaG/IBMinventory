import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Timestamp } from 'firebase/firestore'
import { FormProp } from 'src/app/models/form-prop.model';
import { Orders } from 'src/app/models/inventory/orders.model';
import { AuditService } from 'src/app/services/audit.service';
import { AuthService } from 'src/app/services/auth.service';
import { InvFPService } from 'src/app/services/inv-fp.service';
import { InvRMService } from 'src/app/services/inv-rm.service';
import { OrderService } from 'src/app/services/order.service';
import { ShopOrderService } from 'src/app/services/shop-order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent{

  order: Orders = new Orders();
  submitted = false;
  formObj: FormProp[][];


  q = '';
  queryChange?:string = undefined;
  
  clientName:string = ''
  orderProducts:any[] = []
  reqMaterials:any[] = []
  materials:any[] = []
  username?:string;

  constructor(private shopService: ShopOrderService ,  private invFP: InvFPService ,private invrmService: InvRMService ,private orderService: OrderService,private router: Router, private auditService: AuditService, private auth: AuthService) { 
    this.orderProducts = history.state.order.orderProducts
    this.reqMaterials = history.state.order.reqMaterials
    this.materials = history.state.order.materials
    this.auth.user$.subscribe((data => this.username = data?.displayName))


    var shipDate = new FormProp('Fecha de Embarque' ,'shipDate', 'date'), 
        prodDays = new FormProp('Dias de Produccion' ,'productionDays', 'number',undefined, this.getProductionDays), 
        inputDays = new FormProp('Pedido de Insumos' ,'orderInput', 'number', undefined, this.getOrderInput);
       
    this.formObj = [
      [new FormProp('Numero de Orden de Pedido' ,'name', 'text')],
      [new FormProp('Nombre del Client' ,'clientName', 'text', undefined, this.getClientName)],
      [shipDate],
      [prodDays, inputDays],
      [
        new FormProp('Pedido Materia Prima' ,'rmOrderDeadline', 'date', undefined, this.getRmOrderDeadline, [shipDate, prodDays, inputDays]), 
        new FormProp('Limite inicio de Produccion' ,'startProductionDeadline', 'date', undefined, this.getStartProductionDeadline, [shipDate, prodDays, inputDays])
      ],
    ]
  }

  ngOnInit(): void {
  }

  filterProducts(): void {
    this.queryChange = this.q
  }

  getSelectedElement(element: any){
    if(this.order){
      this.clientName = element.element.name
      this.order.clientId = element.element.id
    }
  }

  getClientName = () => this.clientName

  getProductionDays = () => Math.ceil(this.orderProducts.map(e => e.leadTime * e.quantity).reduce((sum:number, element:number) => sum + element, 0))
  getOrderInput = () => history.state.order.orderWaitMaxTime
  
  getRmOrderDeadline = (shipDate: string, prodDays:number, inputDays:number) => {     
    if(!(shipDate && prodDays && inputDays )) return

    const rm = new Date(shipDate);
    rm.setDate(new Date(shipDate).getDate() - inputDays - prodDays)
    
    return this.formatDateString( rm.toLocaleDateString())
  }

  getStartProductionDeadline = (shipDate: string, prodDays:number, inputDays:number) => {
    if(!(shipDate && prodDays && inputDays )) return
    
    const pd = new Date(shipDate)
    pd.setDate(new Date(shipDate).getDate() - prodDays)
  
    return this.formatDateString(pd.toLocaleDateString())  
  }


  validateForm(){
    return new Date(this.order?.rmOrderDeadline) > new Date()
  }

  submit(order: any){
    this.order = order;
    this.editProducts()
  }


  updateMaterialStock(orderId:string){
   
    this.reqMaterials.forEach((m)=> {
      this.shopService.create(m.matId,m.name,m.requested + m.amount, m.amount, Timestamp.fromDate(new Date(this.order?.rmOrderDeadline)),  m.stockId, (m.requested + m.amount)*m.price, orderId)
      this.invrmService.update(m.stockId, m.newStock)
      this.makeMatStockReport(m.matId, m.name, m.oldStock, m.newStock) //Tddo Report Service Create report
    })

    this.materials.forEach((m)=>{
      this.invrmService.update(m.stockId, m.newStock)
      this.makeMatStockReport(m.matId, m.name, m.oldStock, m.newStock) //Tddo Report Service Create report
    })

    // Object.entries(this.getTotalMaterials()).forEach( async (mat:any) => {
    //   var stock = await this.invrmService.getStock(mat[0]) || 0
    //   var stockUp:any;
      
      
    //   if(!(stock.available!=undefined && stock.commited!=undefined && stock.wating!=undefined && stock.watingCommited!=undefined)) return

    //   if(mat[1].quantity <= stock.available){
    //     stockUp = {commited: (+stock.commited) + mat[1].quantity, available: (+stock.available) - mat[1].quantity}
    //   }else {
        
    //     stockUp = {watingCommited: (+stock.watingCommited) +  mat[1].quantity - (+stock.available), commited: (+stock.commited) + (+stock.available), available: 0}

    //     if((mat[1].quantity - stock.available) <= stock.wating){
    //         stockUp = {wating: (+stock.wating) + (+stock.available) - mat[1].quantity, ...stockUp}
    //     }else{
    //       var req = mat[1].quantity - (+stock.available) - (+stock.wating);      
    //       var amount = req < mat[1].minBatch ? mat[1].minBatch - req: 0;

    //       stockUp = {wating: stock.wating + amount, ...stockUp}
    //       this.shopService.create(mat[0],mat[1].name,req + amount, amount, Timestamp.fromDate(new Date(this.order?.rmOrderDeadline)),  stock.id)
    //     }
    //   }
    //   this.invrmService.update(stock.id, stockUp)
    //   this.makeStockReport(mat[0], mat[1].name, stock, stockUp) //Tddo Report Service Create report
    // })

    alert('Orden Creada satisfactoriamente')
    
    this.router.navigate(['/orders'])
  } 


  updateProductStock(orderId:string){
    this.orderProducts.forEach((p)=>{
      this.invFP.update(p.stock.id, p.newStock)
      this.makeProdStockReport(p.id, p.name, p.stock, p.newStock)
    })

    this.updateMaterialStock(orderId)
  }

  makeProdStockReport(id:string, name:string, oldStock: any, newStock:any){
      this.auditService.create('Actualizacion', `Stock de Producto: ${name}`, this.username,JSON.stringify(newStock),JSON.stringify(oldStock) , id)
  }

  makeMatStockReport(id:string, name:string, oldStock: any, newStock:any){
    this.auditService.create('Actualizacion', `Stock de Material: ${name}`, this.username, JSON.stringify(newStock), JSON.stringify(oldStock), id)
  }

  editProducts(){
    if(!this.validateForm()) {alert('La fecha de Limite del Pedido de material debe ser almenos 2 dias después del dia actual'); return}

    var products = this.orderProducts.map(e => ({id: e.id, invId: e.invId, name: e.name, quantity: e.quantity}))

    var state = this.reqMaterials.length == 0 ? 'EN PRODUCCION': 'ESPERANDO MATERIAL' 

    this.orderService.create({ orderProducts: products, state: state, timestamp:  Timestamp.fromDate(new Date()), ...this.order}).then((order:Orders) => {

      this.updateProductStock(order.id)
      this.auditService.create('Crear',  `Orden de Compra: ${order.name}`, this.username, JSON.stringify(order))

    });
  }
  
  formatDateString(date: string){
    return date.split('/').reverse().join('/').replace(/\//g,'-',)
  } 



}
