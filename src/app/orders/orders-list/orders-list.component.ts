import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/models/inventory/orders.model';
import { InvFPService } from 'src/app/services/inv-fp.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {


  Products?: Orders[];
  currentOrder?: Orders;
  currentIndex = -1;
  title = '';
  
  q = '';
  queryChange?:string = undefined;
  codeFilter = false;
    
  productsPerCall = 2;
  disableNext = false;
  disablePrev = false;
  lastInResponses:any[] = [];

  constructor(private OrderService: OrderService, private productService: ProductService, private invFpService: InvFPService) { }

  ngOnInit(): void {
  }


  getSelectedElement(element: any): void {
    this.currentOrder = element.element;
    this.currentIndex = element.index;
  }
 
  filter(){
    this.queryChange = this.q
  }




  editProducts(){

  }


  setOrderReady(){
    this.currentOrder?.orderProducts?.forEach( async prod => {
      var stock = await this.invFpService.getStock(prod.invId)
      if(stock.wating != undefined && stock.commited != undefined ){
        this.invFpService.update(prod.invId, {wating: (+stock.wating) - prod.quantity, commited: (+stock.commited) + prod.quantity})        
      }
    })
    this.OrderService.update(this.currentOrder?.id, {state: 'TERMINADO'})
    alert('La orden fue establecida como terminada satisfactoriamente')


  }


  completeOrder(){
    this.currentOrder?.orderProducts?.forEach( async prod => {
      var stock = await this.invFpService.getStock(prod.invId)
      if(stock.commited != undefined){
        this.invFpService.update(prod.invId, {commited: stock.commited - prod.quantity})        
      }
    })

    // this.OrderService.delete(this.currentOrder?.id).then(() => {
    //   this.refreshList()
    // })
  }

  readableDate(time:any) {
    var d = new Date(time);
    return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
  }
}
