import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Product } from 'src/app/models/catalogue/product.model';
import { FirestoreOperationService } from 'src/app/services/firestore-operation.service';
import { MaterialService } from 'src/app/services/material.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [FirestoreOperationService, {provide: 'path', useValue: '/products'}]
})
export class ProductListComponent implements OnInit {


  Products?: Product[];
  currentProduct?: Product;
  currentIndex = -1;
  title = '';
  
  query = '';
  queryChange?:string = undefined;
  codeFilter = false;
    
  productsPerCall = 2;
  disableNext = false;
  disablePrev = false;
  lastInResponses:any[] = [];

  private pagination: any



  constructor(private ProductService: ProductService,  private fos: FirestoreOperationService) { 
    this.pagination = {
      query: undefined,
      filterType: false,
      filterKey: '',
      productsPerCall: 2,
      disableNext:false,
      disablePrev: true,
      lastInResponses: [],
      requestDataArray: []
    }
  }

  ngOnInit(): void {
    this.fos.paginationSetter(this.pagination);
    this.nextPage(true)
    // this.data(true)
  }

  refreshList(): void {
    
    this.currentProduct = undefined;
    this.currentIndex = -1;
    var ar = this.lastInResponses.splice(0, this.lastInResponses.length)
    this.nextPage(true)
    console.log(this.lastInResponses, ar)
  }


  data = async (direction: boolean) => { 
   const resp = await this.fos.nextPage<Product>(direction)
   if(!resp) return

   this.pagination = resp
   this.Products = this.pagination.requestDataArray;
   this.disableNext = this.pagination.disableNext
   this.disablePrev =  this.pagination.disablePrev

   console.log(this.Products)
  }


  nextPage(direction: boolean) {
  
    var anchor:any;
    if(direction){
      if(this.disableNext) return;
      
      if(this.Products?.length){
        this.pagination.lastInResponses?.push(this.Products[this.Products.length - 1])
      }  
      anchor = this.pagination.lastInResponses?.length ? this.pagination.lastInResponses[this.pagination.lastInResponses?.length - 1]: undefined;
    }else{
      if(this.disablePrev) return;
      this.pagination.lastInResponses?.pop();
      anchor = this.pagination.lastInResponses?.pop();
    }
        
    var req: AngularFirestoreCollection<Product>;
    if(this.pagination.query){
        req = this.fos.filterByKeyBatch<Product>( this.pagination.filterKey, this.pagination.query,this.pagination.productsPerCall, anchor)
    } else{
      req = this.fos.getNextBatch<Product>(this.pagination.productsPerCall, anchor)
    }
    

    req.snapshotChanges().pipe(
      map(changes => changes.map(c => 
        ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe(data => {
        if(!data.length){
          this.disableNext = true;
          this.pagination.lastInResponses.pop()
          return;
        }
        this.Products = data;
        this.disableNext = data.length < this.productsPerCall; //What if last batch is exactly productPerCall
        this.disablePrev = anchor ? false: true
        
      });
  }


  
  filterProducts(){
    
    this.Products = []
    this.lastInResponses = []
    this.disableNext = false;
    this.disablePrev = true;

    this.pagination = {
      query: this.query,
      filterKey: this.codeFilter ? 'code': 'name',
      productsPerCall: 2,
      disableNext:false,
      disablePrev: true,
      lastInResponses: [],
      requestDataArray: []
    }


    // this.fos.paginationSetter(this.pagination)
    // this.data(true)
    this.nextPage(true)
  }

  setActiveProduct(Product: Product, index: number): void {
    this.currentProduct = Product;
    this.currentIndex = index;
  }

  readableDate(time:any) {
    var d = new Date(time);
    return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
  }

}
