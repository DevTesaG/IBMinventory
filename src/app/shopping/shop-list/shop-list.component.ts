import { Component, OnInit } from '@angular/core';
import { FormProp } from 'src/app/models/form-prop.model';
import { ShopRM } from 'src/app/models/shopping/shopRM.model';
import { InvRMService } from 'src/app/services/inv-rm.service';
import { ShopOrderService } from 'src/app/services/shop-order.service';
import { Timestamp } from 'firebase/firestore'
import { OrderService } from 'src/app/services/order.service';
import { AuditService } from 'src/app/services/audit.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {

  currentOrder?: ShopRM;
  orderStateFilter?:string
  currentIndex = -1;
  username?:string = 'anonimo'

  query = '';
  queryChange?:any = undefined;
  codeFilter = false;
  filterKey:string = 'name'
  dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  formObj: FormProp[][];

  constructor(private OrderService: ShopOrderService, private invrmService: InvRMService,private sellOrderService: OrderService, private audit: AuditService, private auth: AuthService) { 
    
    this.auth.user$.subscribe((data => this.username = data?.displayName))

    this.formObj = [
      [new FormProp('Nombre del Material' ,'name', 'text')],
      [new FormProp('Fecha Limite del Material' ,'orderDeadline', 'date'), new FormProp('Fecha de Emision de Orden' ,'emissionDate', 'date')],
      [ 
        new FormProp('Cantidad Solicitada' ,'requiredMaterial', 'number'),
        new FormProp('Costo del Pedido' ,'cost', 'number'), 
      ],
    ]
  }

  ngOnInit(): void {
  }

  refreshList(): void {
    this.currentOrder = undefined;
    this.currentIndex = -1;
  }

  removeProductFromOrder(j: number){

  }


  submit(order: any){
  }

  getSelectedElement(element:any){
    console.log(this.currentOrder)
    this.currentOrder = element.element;
    this.currentIndex = element.index;
  }

  editOrder(order:any){
  if(!(this.currentOrder && this.currentOrder.requestedAmount)) return
  
  if(this.currentOrder.requestedAmount > order.requestedAmount){
    alert('No puede pedir menos material del requerido para una orden activa')
    return
  }
    this.OrderService.update(this.currentOrder?.id, {requiredMaterial: order.requiredMaterial})
    this.audit.create('Editar', `Orden de Compra ${order.name}`, this.username, JSON.stringify(order), JSON.stringify(this.currentOrder), this.currentOrder.id)
  }

  completeOrder(cont:boolean){
    if(!cont) return

    if (this.currentOrder) {
      this.OrderService.update(this.currentOrder.id, {fulfilled: true}).then(async () => {
          
          this.refreshList()
          var stock = await this.invrmService.getStock(this.currentOrder?.materialId)
          
          if(this.currentOrder?.stockId &&  this.currentOrder?.requestedAmount != undefined && this.currentOrder?.requiredMaterial != undefined && stock.watingCommited !=undefined && stock.commited != undefined && stock.wating != undefined && stock.available != undefined){
            var newStock = { 
              available: stock.available + this.currentOrder.requestedAmount, 
              waiting: stock.wating - this.currentOrder?.requestedAmount,
              watingCommited: stock.watingCommited - this.currentOrder.requiredMaterial + this.currentOrder.requestedAmount, 
              commited: stock.commited +  this.currentOrder?.requiredMaterial - this.currentOrder.requestedAmount
            }
            this.invrmService.update(this.currentOrder.stockId, newStock).then(()=>{
              if(this.currentOrder?.orderId)
              this.sellOrderService.update(this.currentOrder?.orderId, {state: 'EN PRODUCCIÓN'})
              this.audit.create('Editar', `Stock de Material: ${this.currentOrder?.name}`, this.username, JSON.stringify(newStock), JSON.stringify(stock))
            })
          }
        }).catch(err => console.log(err));
    }
  }


  activateOrder(cont:boolean){
    if(!cont) return

    if(this.currentOrder){
      const prior = this.currentOrder.emissionDate  
      this.currentOrder.emissionDate =  Timestamp.fromDate( new Date())
      this.OrderService.update(this.currentOrder.id, {emissionDate: this.currentOrder.emissionDate }).then(()=>{
        this.audit.create('Editar', `Orden de Compra: ${this.currentOrder?.name}`, this.username, this.currentOrder?.emissionDate, prior)
      })
    }
  }


  filter(): void {
    if(this.codeFilter && this.orderStateFilter=='URGENTE'){
      this.queryChange = {key:'orderDeadline', value:Timestamp.fromDate(new Date())}
    }else{
      this.queryChange = {key:'name', value:this.query}
    }
  }
}
