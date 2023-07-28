import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Orders } from 'src/app/models/inventory/orders.model';
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
  
  query = '';
  queryChange?:string = undefined;
  codeFilter = false;
    
  productsPerCall = 2;
  disableNext = false;
  disablePrev = false;
  lastInResponses:any[] = [];

  constructor(private OrderService: OrderService, private productService: ProductService) { }

  ngOnInit(): void {
    this.nextPage(true)
  }

  refreshList(): void {
    
    this.currentOrder = undefined;
    this.currentIndex = -1;
    this.lastInResponses = []
    this.Products = []
    this.nextPage(true)
  }




  nextPage(direction: boolean) {
  
  var anchor: any;
  
  if(direction){
    if(this.disableNext) return;
    
    if(this.Products?.length){
      this.lastInResponses?.push(this.Products[this.Products.length - 1])
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

      this.Products = data;
      this.disableNext = data.length < this.productsPerCall; //What if last batch is exactly productPerCall
      this.disablePrev = anchor ? false: true
    }, error => {
      this.disableNext = false;
  });
  }

  removeProductFromOrder(j: number){

  }

  editProducts(){

  }

  useFP(productId: string, index: number){
    if(this.codeFilter){
        this.productService.getById(productId).pipe(map(c => ({id: c.id, ...c.data()}))).subscribe(data =>  { 
        if(this.currentOrder?.orderProducts){
            this.currentOrder.orderProducts[index].stock = data.stock ? data.stock: 0;
        }});
    }else{
      if(this.currentOrder?.orderProducts){
        this.currentOrder.orderProducts[index].stock = ''   
      }
    }
  }

  fullfillOrder(){
    
    if (this.currentOrder?.id) {
      this.OrderService.update(this.currentOrder.id, {fulfilled: true})
        .then(() => this.refreshList())
        .catch(err => console.log(err));
    }
  }
  

  filterProducts(): void {
    this.queryChange = this.query
    this.Products = []
    this.lastInResponses = []
    this.nextPage(true)
  }

  setActiveProduct(Product: Orders, index: number): void {
    this.currentOrder = Product;
    this.currentIndex = index;
  }

  completeOrder(){
    this.OrderService.delete(this.currentOrder?.id).then(() => this.refreshList())
  }

  readableDate(time:any) {
    var d = new Date(time);
    return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
  }
}
