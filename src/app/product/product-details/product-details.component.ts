import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/catalogue/product.model';
import { InvFPService } from 'src/app/services/inv-fp.service';
import { ProductService } from 'src/app/services/product.service';
import { Timestamp } from 'firebase/firestore'
import { FormProp } from 'src/app/models/form-prop.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  @Input() product?: Product;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();

  formObj: FormProp[][];

  currentProduct: Product = {
    name: '',
    description: '',
    code: '',
    price: 0,
    leadTime: 0,
    stock: 0,
    capacityByTurn: 0,
  };
  message = '';

  income = 0
  outflow = 0

  
  constructor(private productService: ProductService, private reportService: InvFPService) { 
    this.formObj = [
      [new FormProp('Nombre' ,'name', 'text'), new FormProp('Codigo' ,'code', 'text')],
      [new FormProp('Descripcion' ,'description', 'text')],
      [new FormProp('Precio' ,'price', 'number')],
      [new FormProp('Cantidad en Inventario' ,'stock', 'number')],
      [new FormProp('Capacidad por turno' ,'capacityByTurn', 'number'), new FormProp('Tiempo de Produccion', 'leadTime', 'number')] ,
    ]
  }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentProduct = { ...this.product };
  }


  createInventoryReport(): void {
    if(!this.income) return
    const report = {
      name: this.currentProduct.name,
      available: this.currentProduct.stock,
      commited: 0,
      wating: 0,
      timestamp:  Timestamp.fromDate(new Date()),
    } 
  
   this.reportService.create(report)
 }

 submit(product:Product){

 }

 onReject(){

 }

  updateProduct(): void {
    const data = {
      name: this.currentProduct.name,
      code: this.currentProduct.code,
      description: this.currentProduct.description,
      price: this.currentProduct.price,
      leadTime: this.currentProduct.leadTime,
      capacityByTurn: this.currentProduct.capacityByTurn,
    };

    if (this.currentProduct.id) {
      this.productService.update(this.currentProduct.id, data)
        .then(() => {this.refreshList.emit();this.message = 'The product was updated successfully!'; })
        .catch(err => console.log(err));
    }
  }

  deleteProduct(): void {
    if (this.currentProduct.id) {
      this.productService.delete(this.currentProduct.id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The product was deleted successfully!';
        })
        .catch(err => console.log(err));
    }
  }

}
