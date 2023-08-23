import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/catalogue/product.model';
import { FirestoreOperationService } from 'src/app/services/firestore-operation.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [FirestoreOperationService, {provide: 'path', useValue: '/products'}]
})
export class ProductListComponent implements OnInit {


  currentProduct?: Product;
  title = '';
  
  q = '';
  query = '';
  codeFilter = false;

  constructor() { }

  ngOnInit(): void {
  }

  refreshList(): void {    
    this.currentProduct = undefined;
  }


  filter(){
    this.q = this.query
    this.refreshList()
  }

  getSelectedElement(element: any){
    this.currentProduct = element.element
  }

}
