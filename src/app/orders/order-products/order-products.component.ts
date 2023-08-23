import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/catalogue/product.model';
import { Orders } from 'src/app/models/inventory/orders.model';
import { InvFPService } from 'src/app/services/inv-fp.service';
import { InvRMService } from 'src/app/services/inv-rm.service';

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.css']
})
export class OrderProductsComponent implements OnInit {
  


  orderProducts:any[] = []
  materials:any[] = []
  constructor(private router: Router, private invFP: InvFPService) { }

  ngOnInit(): void {
  }

  q = '';
  query = '';
  codeFilter = false;
  continueDisabled = true;

  filter(){
    this.q = this.query
  }


  createOrder(){

    // var mats = this.getTotalMaterials()
    var mats = ['a']
    this.updateProductStock()

    this.orderProducts.forEach(e=> {delete e.materials; delete e.available})
    this.router.navigate(['orders/add/providers'], { state: {materials: mats, products: this.orderProducts} });
  }

  getTotalMaterials(){
    if(!this.orderProducts) return []

    this.orderProducts.forEach(e => e.materials.forEach((el:any) => el.quantity *= e.quantity ))

    return this.orderProducts.flatMap( e => e.materials).reduce((pv, e)=> {
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

  updateProductStock(){
    this.orderProducts.forEach(async (p)=>{
      var stockUp;
      if(p.available){
        if(!(p.stock.available!=undefined && p.stock.commited!=undefined && p.stock.wating!=undefined)) return
        if(p.quantity <= p.stock.available){
          stockUp = {commited: (+p.stock.commited) + p.quantity, available: (+p.stock.available) - p.quantity}
        }else{
          stockUp = {wating: (+p.stock.wating) +  p.quantity - (+p.stock.available), commited: (+p.stock.commited) + (+p.stock.available), available: 0}
        }
      }else{
        if(!p.stock){
           p.stock = await this.invFP.getStock(p.id) || 0
        }
        stockUp = {wating: p.stock.wating + (+p.quantity)}
      }
      p.newStock = stockUp
    })
  }



  addProductToOrder(product: any){
    this.continueDisabled = false
    var occurence = this.orderProducts.find(e => e.id == product.id)
    if(occurence) return;
    this.orderProducts.push({name: product.name, id: product.id, invId: product.invId,  leadTime: product.leadTime, materials:product.materials})
 }

 validate(){

 }


 removeProductFromOrder(materialIndex:any){
   this.orderProducts.splice(materialIndex, 1)
   this.continueDisabled = this.orderProducts.length ? true: false;
}

  getSelectedElement(element: any){
    this.addProductToOrder(element.element)
  }

}
