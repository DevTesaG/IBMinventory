import { Component, OnInit, SimpleChanges } from '@angular/core';
import { concat, from, merge, mergeMap, switchMap, take, tap } from 'rxjs';
import { FormProp } from 'src/app/models/form-prop.model';
import { Orders } from 'src/app/models/inventory/orders.model';
import { FinishedOrdersService } from 'src/app/services/finished-orders.service';
import { InvFPService } from 'src/app/services/inv-fp.service';
import { InvRMService } from 'src/app/services/inv-rm.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {


  Products?: Orders[];
  currentOrder?: Orders;

  title = '';
  currentIndex = -1;
  formObj: FormProp[][];
  orderStateFilter?:string;
  
  q = '';
  queryChange?:any = undefined;
  codeFilter = false;
  download = false;

  constructor(private OrderService: OrderService, private invFpService: InvFPService, private invRmService: InvRMService, private fo: FinishedOrdersService) { 

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
    this.queryChange = {value: this.orderStateFilter, exact:true}
    this.currentOrder = undefined;
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

  downloadFinishedOrders(cont:boolean){
    if(!cont) return 
    this.download = true;
    this.fo.deleteAll().subscribe({
      complete: ()=> {this.download =false; alert('Ordenes Terminadas Eliminadas correctamente');}, 
      error: ()=> {this.download = false; alert('Error inesperado, porfavor intente de nuevo'); }
    })
  }


  setOrderReady(cont:boolean){
    if(!cont) return
    if(this.currentOrder?.state == 'ESPERANDO MATERIAL'){
      alert('La orden NO puede establecerse como "LISTA" ya que está "ESPERANDO MATERIAL".')
      return 
    }

    concat(
      from(this.currentOrder?.orderProducts ?? []).pipe(
      mergeMap(prod => from(this.invFpService.getStock(prod.invId)).pipe(
        take(1),
        switchMap(stock => this.invFpService.update(prod.invId, 
          {wating: Math.max(0, +(stock.wating ?? 0) - prod.quantity), commited: Math.max(0, +(stock.commited ?? 0) + prod.quantity)}
          )        
        )
      ))
    ),
    this.OrderService.update(this.currentOrder?.id, {state: 'TERMINADA'})
    ).subscribe(
      {error: e => alert(e), complete: () => alert('La orden fue establecida como terminada satisfactoriamente')}
    )
  }


  completeOrder(cont:boolean){
    if(!cont) return
    if(this.currentOrder?.state == 'EN PRODUCCION'){
      alert('La orden NO puede establecerse como "TERMINADA" ya que está "EN PRODUCCION".')
      return 
    }
    

    var updateProd$ = from(this.currentOrder?.orderProducts ?? []).pipe(
      mergeMap(prod => from( this.invFpService.getStock(prod.invId)).pipe(
        take(1),
        switchMap(stock => this.invFpService.update(prod.invId, {commited: Math.max(0, +(stock.commited ?? 0) - prod.quantity)}))
      )),
    )

    var updateMat$ = from(this.currentOrder?.orderMaterials ?? []).pipe(
      mergeMap(m => this.invRmService.getStock(m.matId).pipe(
        take(1),
        switchMap(stock => this.invRmService.update(stock.id, {commited: Math.max(0, +(stock.commited ?? 0) - (+m.quantity))})
        )
      ))
    )

    concat(merge(updateProd$, updateMat$), merge(this.OrderService.delete(this.currentOrder?.id), this.fo.create({state: 'ENTREGADA',  ...this.currentOrder}))).pipe(
      tap({complete: ()=> alert('Orden Completada')})
    ).subscribe()
   
    this.refreshList()   
  }

  readableDate(time:any) {
    var d = new Date(time);
    return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
  }
}
