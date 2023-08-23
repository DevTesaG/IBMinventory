import { UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/catalogue/product.model';
import { InvFPService } from 'src/app/services/inv-fp.service';
import { ProductService } from 'src/app/services/product.service';
import { Timestamp } from 'firebase/firestore'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  @Input() product?: Product;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
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

  
  constructor(private productService: ProductService, private reportService: InvFPService) { }

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
      productId: this.currentProduct.id,
      name: this.currentProduct.name,
      income: this.income,
      outcome: this.outflow,
      timestamp:  Timestamp.fromDate(new Date()),
    } 
  
   this.reportService.create(report)
 }


  updateProduct(): void {
    const data = {
      name: this.currentProduct.name,
      code: this.currentProduct.code,
      description: this.currentProduct.description,
      price: this.currentProduct.price,
      leadTime: this.currentProduct.leadTime,
      stock: this.currentProduct.stock ? this.currentProduct.stock + this.income: this.income,
      capacityByTurn: this.currentProduct.capacityByTurn,
    };

    if (this.currentProduct.id) {
      this.productService.update(this.currentProduct.id, data)
        .then(() => {this.refreshList.emit();this.message = 'The product was updated successfully!'; this.currentProduct.stock = data.stock;})
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
