import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormProp } from 'src/app/models/form-prop.model';
import { Orders } from 'src/app/models/inventory/orders.model';
import { InvFPService } from 'src/app/services/inv-fp.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {


  Products?: Orders[];
  currentOrder?: Orders;
  formObj: FormProp[][];
  orderStateFilter?:string;
  currentIndex = -1;
  title = '';
  
  q = '';
  queryChange?:string = undefined;
  codeFilter = false;

  constructor(private OrderService: OrderService, private invFpService: InvFPService) { 
    this.formObj = [
      [new FormProp('Numero de Orden de Pedido' ,'name', 'text'), new FormProp('Estado' ,'state', 'text')],
      [new FormProp('Nombre del Cliente' ,'clientName', 'text')],
      [new FormProp('Fecha de Embarque' ,'shipDate', 'date')],
      [new FormProp('Dias de Produccion' ,'productionDays', 'number'), new FormProp('Pedido de Insumos' ,'orderInput', 'number')],
      [
        new FormProp('Pedido Materia Prima' ,'rmOrderDeadline', 'date'), 
        new FormProp('Limite inicio de Produccion' ,'startProductionDeadline', 'date')
      ],
      [new FormProp('Notas' ,'notes', 'text')]
    ]
  }

  ngOnInit(): void {
  }


  submit(order:any){

  }

  getSelectedElement(element: any): void {
    this.currentOrder = element.element;
    this.currentIndex = element.index;
  }
 
  filter(){
    this.currentOrder = undefined;
    this.queryChange = this.orderStateFilter
  }

  refreshList(){
    this.orderStateFilter = undefined
    this.currentOrder = undefined
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['orderStateFilter'])
    this.currentOrder = undefined;
  }

  editProducts(){

  }


  setOrderReady(cont:boolean){
    if(!cont) return
    this.currentOrder?.orderProducts?.forEach( async prod => {
      var stock = await this.invFpService.getStock(prod.invId)
      if(stock.wating != undefined && stock.commited != undefined ){
        this.invFpService.update(prod.invId, {wating: (+stock.wating) - prod.quantity, commited: (+stock.commited) + prod.quantity})        
      }
    })
    this.OrderService.update(this.currentOrder?.id, {state: 'TERMINADA'})
    this.refreshList()
    alert('La orden fue establecida como terminada satisfactoriamente')
  }


  completeOrder(cont:boolean){
    if(!cont) return
    this.currentOrder?.orderProducts?.forEach( async prod => {
      var stock = await this.invFpService.getStock(prod.invId)
      if(stock.commited != undefined){
        this.invFpService.update(prod.invId, {commited: stock.commited - prod.quantity})     
        this.refreshList()   
      }
    })
  }

  readableDate(time:any) {
    var d = new Date(time);
    return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
  }
}
