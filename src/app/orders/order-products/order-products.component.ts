import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormProp } from 'src/app/models/form-prop.model';
import { InvFPService } from 'src/app/services/inv-fp.service';
import { OrdersBuisnessService } from 'src/app/services/orders-buisness.service';

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.css']
})
export class OrderProductsComponent implements OnInit {
  


  orderProducts:any[] = []
  materials:any[] = []
  formObj!:FormProp[][]
  constructor(private router: Router, private invFP: InvFPService, public orderBuisness: OrdersBuisnessService) { }

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

    if( this.orderBuisness.orderProducts.filter(p => !p.quantity || p.quantity < 0 || !Number.isInteger(p.quantity) ).length != 0){
      alert('Hay productos sin cantidad asignada o menor a 0, porfavor rectifique.')
      return
    }

    console.log(this.orderBuisness.orderProducts)

    this.orderBuisness.getTotalMaterials()
    this.orderBuisness.updateOrderProductStock()
    this.orderBuisness.getTotalPrice()
    this.orderBuisness.orderProducts.forEach(e=> {delete e.materials; delete e.available})

    this.router.navigate(['orders/add/providers']);
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

  addProductToOrder(product: any){
    this.continueDisabled = false
    var occurence = this.orderBuisness.orderProducts.find(e => e.id == product.id)
    if(occurence) return;
    this.orderBuisness.orderProducts.push({name: product.name, id: product.id, invId: product.invId,  leadTime: product.leadTime, materials:product.materials, price: product.price, currency: product.currency})
 }


 validate(){

 }


 removeProductFromOrder(materialIndex:any){
   this.orderBuisness.orderProducts.splice(materialIndex, 1)
   this.continueDisabled = this.orderBuisness.orderProducts.length ? true: false;
}

  getSelectedElement(element: any){
    this.continueDisabled = this.orderBuisness.orderProducts.length ? true: false;
    this.addProductToOrder(element.element)
   }

}
