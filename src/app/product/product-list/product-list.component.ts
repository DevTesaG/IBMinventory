import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/catalogue/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreOperationService } from 'src/app/services/firestore-operation.service';
import { Timestamp } from 'firebase/firestore'
import { map } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [FirestoreOperationService, {provide: 'path', useValue: '/products'}]
})
export class ProductListComponent implements OnInit {


  currentProduct?: Product;
  title = '';
  
  q:any = '';
  query = '';
  codeFilter = false;
  userRole?:string
  constructor(private auth:AuthService) { 
    // this.auth.user$.subscribe((data => this.userRole = data?.userRole))
    this.userRole = 'a'
  }

  ngOnInit(): void {
  }

  refreshList(): void {    
    this.currentProduct = undefined;
  }


  filter(){
    this.q = this.codeFilter ? {key: 'code', value: this.query}:  this.query
    this.refreshList()
  }

  getSelectedElement(element: any){
    this.currentProduct = element.element
  }

}
