import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Client } from 'src/app/models/catalogue/client.model';
import { Product } from 'src/app/models/catalogue/product.model';
import { FirestoreOperationService } from 'src/app/services/firestore-operation.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  providers: [FirestoreOperationService, {provide: 'path', useValue: '/products'}]
})
export class PaginationComponent implements OnInit {

  @Output() selectedElement: EventEmitter<Object> = new EventEmitter<Object>();
  @Input() query?: string = 'Registrar';
  @Input() path?: string = '/products';


  product?: Product
  currentElement?: Object
  currentIndex: number = 0
  
  disableNext = false;
  disablePrev = true;
  
  updateProducts = false;
  elementArray:any[] = []
  lastInResponses?:any[] = []
  queryChange?:string = undefined;
  elementPerCall:number = 2

  secondaryList:boolean = false


  constructor(private fos: FirestoreOperationService) { }

  ngOnInit(): void {
  }

  setActiveProduct(product: any, index: number): void {
    this.currentElement = product;
    this.currentIndex = index;
    this.selectedElement.emit(this.currentElement)
  }

  nextPage(direction: boolean) {
  
    var anchor:any;
    if(direction){
      if(this.disableNext) return;
      
      anchor = this.elementArray.at(-1)
      this.elementArray.push(anchor)
    
    }else{
      if(this.disablePrev) return;
      this.lastInResponses?.pop();
      anchor = this.lastInResponses?.at(-1);
    }
    
    
    var req: AngularFirestoreCollection<typeof this.product>;
    if(this.queryChange){

      req = this.fos.filterByKeyBatch<Object>('name', this.queryChange, this.elementPerCall, anchor)
      
      req = this.fos.paginationSetter('/clients').filterByKeyBatch<Client>('name', this.queryChange, this.elementPerCall, anchor)
    } else{
      req = this.fos.getNextBatch<Object>(this.elementPerCall, anchor) 
    }
    
    req.snapshotChanges().pipe(
      map(changes => changes.map(c =>  ({ id: c.payload.doc.id, ...c.payload.doc.data() })))
      ).subscribe( (data:any) => {
        if(!data.length){
          this.disableNext = true;
          return;
        }
        console.log(data  )
        this.elementArray = data;
        this.disableNext = data.length < this.elementPerCall; //What if last batch is exactly productPerCall
        this.disablePrev = anchor ? false: true
        
      });
  }


  resetPagination():void{
    this.disableNext = false;
    this.disablePrev;
    this.elementArray = []
    this.lastInResponses = []
  }

  filterProducts(): void {
    this.resetPagination()
    this.queryChange = this.query
    this.nextPage(true)
  }


}
