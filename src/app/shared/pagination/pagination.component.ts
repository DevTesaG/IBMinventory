import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { FirestoreOperationService } from 'src/app/services/firestore-operation.service';
import { InvRMService } from 'src/app/services/inv-rm.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  providers: [FirestoreOperationService, {provide: 'path', useValue: '/RMreport'}]
})
export class PaginationComponent implements OnInit {

  @Output() selectedElement: EventEmitter<any> = new EventEmitter<any>();
  @Output() fetchedArray: EventEmitter<any> = new EventEmitter<any>();
  @Input() query?: any;
  @Input() path?: string;
  @Input() showParams?: string[]= ['name'];
  @Input() mode?: boolean = false;
  @Input() key:string = 'name';
  
  dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  currentElement?: Object
  currentIndex?: number = -1
  isFetched = false;
  firstCall = true;
  
  disableNext = false;
  disablePrev = true;
  
  updateProducts = false;
  elementArray:any[] = []
  lastInResponses:any[] = []
  queryChange?:any = undefined;
  filterKey:string = 'name';
  exact:boolean = false;
  elementPerCall:number = 2



  constructor(private fos: FirestoreOperationService) {}

  ngOnInit(): void {
    if(!this.path) this.path = '/products'
    this.fos.pathSetter(this.path)
    this.nextPage(true)
    this.filterKey = this.key
    this.firstCall = false
  }

  setActiveProduct(element: any, index: number): void {
    this.currentIndex = index
    this.selectedElement.emit({element: element, index: index})
  }

  nextPage(direction: boolean) {
  
    var anchor:any;

    if(direction){
      if(this.disableNext) return;
      
      anchor = this.elementArray.at(-1)
      this.lastInResponses.push(anchor)
    }else{
      if(this.disablePrev) return;
      this.lastInResponses?.pop();
      anchor = this.lastInResponses?.at(-1);
    }
    
    var req: AngularFirestoreCollection<Object>;
    if(this.queryChange){
      req = this.fos.filterByKeyBatch<Object>(this.key, this.queryChange, this.elementPerCall, anchor, this.exact)
    } else{
      req = this.fos.getNextBatch<Object>(this.elementPerCall, anchor) 
    }
    
    req.get().pipe(map(changes => changes.docs.map(c =>  ({ id: c.id,...c.data()})))
      ).subscribe( (data:any) => {
        console.log(data)
        if(!data.length){
          this.disableNext = true;
          this.lastInResponses?.pop();
          return;
        }
        this.elementArray = data;
        this.disableNext = data.length < this.elementPerCall;
        this.disablePrev = anchor ? false: true
        this.isFetched = true;
        
        if(this.mode){
          this.fetchedArray.emit(this.elementArray)
        }
      });
  }


  resetPagination():void{
    this.disableNext = false;
    this.disablePrev = true;
    this.currentIndex = -1;
    this.currentElement = undefined
    this.elementArray = []
    this.lastInResponses = []
  }


  ngOnChanges(changes: SimpleChanges) {
    if(this.firstCall) return
    this.isFetched = false
   
    if(changes['query']){ 
      if(changes['query'].currentValue instanceof Object){
       this.queryChange = changes['query'].currentValue.value
       this.key = changes['query'].currentValue.key
       this.exact = changes['query'].currentValue.exact ? true:false
      }else{
        this.queryChange = changes['query'].currentValue
        this.key = this.filterKey
        this.exact = false
      }
      console.log(this.key, this.queryChange)
      this.filterProducts();
    }else if(changes['path']){
      this.resetPagination()
      this.fos.pathSetter(changes['path'].currentValue)  
      this.nextPage(true)
    }
  }

  filterProducts(): void {
    this.resetPagination()
    this.nextPage(true) 
  }


}
