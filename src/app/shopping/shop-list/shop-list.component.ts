import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { FormProp } from 'src/app/models/form-prop.model';
import { ShopRM } from 'src/app/models/shopping/shopRM.model';
import { InvRMService } from 'src/app/services/inv-rm.service';
import { ShopOrderService } from 'src/app/services/shop-order.service';
import { Timestamp } from 'firebase/firestore'

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {



  shopOrders?: ShopRM[];
  currentOrder?: ShopRM;
  currentIndex = -1;
  title = '';
  
  query = '';
  queryChange?:string = undefined;
  codeFilter = false;
    
  productsPerCall = 2;
  disableNext = false;
  disablePrev = false;
  lastInResponses:any[] = [];

  dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  formObj: FormProp[][];

  constructor(private OrderService: ShopOrderService, private invrmService: InvRMService,) { 
    this.formObj = [
      [new FormProp('Nombre del Material' ,'name', 'text'), new FormProp('Cantidad Solicitada' ,'requiredMaterial', 'number')],
      [new FormProp('Fecha Limite del Material' ,'orderDeadline', 'date'), new FormProp('Fecha de Emision de Orden' ,'emissionDate', 'date')],
      [
        new FormProp('Costo del Pedido' ,'cost', 'number'), 
      ],
    ]
  }

  ngOnInit(): void {
    this.nextPage(true)
  }

  refreshList(): void {
    
    this.currentOrder = undefined;
    this.currentIndex = -1;
    this.lastInResponses = []
    this.shopOrders = []
    this.nextPage(true)
  }




  nextPage(direction: boolean) {
  
  var anchor: any;
  
  if(direction){
    if(this.disableNext) return;
    
    if(this.shopOrders?.length){
      this.lastInResponses?.push(this.shopOrders[this.shopOrders.length - 1])
    }  
    anchor = this.lastInResponses?.length ? this.lastInResponses[this.lastInResponses?.length - 1]: undefined;
  }else{
    if(this.disablePrev) return;
    this.lastInResponses?.pop();
    anchor = this.lastInResponses?.pop();
  }

  var req;
  if(this.queryChange){
    if(this.codeFilter){
      // req = this.OrderService.filterByCodeBatch(this.queryChange,this.productsPerCall, anchor)
      req = this.OrderService.getNextBatch(this.productsPerCall, anchor)
    }else{
      // req = this.OrderService.filterByNameBatch(this.queryChange,this.productsPerCall, anchor)
      req = this.OrderService.getNextBatch(this.productsPerCall, anchor)
    }
  } else{
    req = this.OrderService.getNextBatch(this.productsPerCall, anchor)
  }

  req.snapshotChanges().pipe(
      map(changes => changes.map(c => 
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      if(!data.length){
        this.disableNext = true;
        return;
      }
      console.log(data)

      this.shopOrders = data;
      this.disableNext = data.length < this.productsPerCall; //What if last batch is exactly productPerCall
      this.disablePrev = anchor ? false: true
    }, error => {
      this.disableNext = false;
  });
  }

  removeProductFromOrder(j: number){

  }


  submit(order: any){
  }

  completeOrder(){
    if (this.currentOrder) {
      this.OrderService.update(this.currentOrder.id, {fulfilled: true}).then(async () => {
          
          this.refreshList()
          var stock = await this.invrmService.getStock(this.currentOrder?.materialId)
          
          if(this.currentOrder?.stockId &&  this.currentOrder?.requestedAmount != undefined && this.currentOrder?.requiredMaterial != undefined && stock.watingCommited !=undefined && stock.commited != undefined && stock.wating != undefined && stock.available != undefined){
            this.invrmService.update(this.currentOrder.stockId, { 
              available: stock.available + this.currentOrder.requestedAmount, 
              waiting: stock.wating - this.currentOrder?.requestedAmount,
              watingCommited: stock.watingCommited - this.currentOrder.requiredMaterial + this.currentOrder.requestedAmount, 
              commited: stock.commited +  this.currentOrder?.requiredMaterial - this.currentOrder.requestedAmount
            }) 
          }
        }).catch(err => console.log(err));
    }
  }


  activateOrder(){
    if(this.currentOrder){
      this.currentOrder.emissionDate =  Timestamp.fromDate( new Date())
      this.OrderService.update(this.currentOrder.id, {emissionDate: this.currentOrder.emissionDate })
    }
  }


  filterProducts(): void {
    this.queryChange = this.query
    this.shopOrders = []
    this.lastInResponses = []
    this.nextPage(true)
  }

  setActiveProduct(Product: ShopRM, index: number): void {
    this.currentOrder = Product;
    this.currentIndex = index;

  }
}
