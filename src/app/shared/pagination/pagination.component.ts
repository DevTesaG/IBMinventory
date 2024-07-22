import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable, map, of, switchMap, tap } from 'rxjs';
import { CacheService } from 'src/app/services/cache.service';
import { FirestoreOperationService } from 'src/app/services/firestore-operation.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  providers: [FirestoreOperationService, {provide: 'path', useValue: '/RMreport'}, CacheService]
})
export class PaginationComponent implements OnInit {


  @Output() selectedElement: EventEmitter<any> = new EventEmitter<any>();
  @Output() fetchedArray: EventEmitter<any> = new EventEmitter<any>();
  @Input() query?: any;
  @Input() path?: string;
  @Input() showParams?: string[]= ['name'];
  @Input() mode?: boolean = false;
  @Input() key:string = 'name';

  fetchedDataSub$:BehaviorSubject<Observable<any[]>> = new BehaviorSubject(of([{  }]))
  fetchedData$:Observable<any[]> = of([])
  
  dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  currentElement?: Object
  currentIndex?: number = -1

  isFetched = false;
  firstCall = true;
  disableNext = false;
  disablePrev = true;

  queryChange?:string = undefined;
  filterKey:string = 'name';
  exact:boolean = false;
  elementPerCall:number = 10

  constructor(private fos: FirestoreOperationService, private cache:CacheService) {}

  ngOnInit(): void {
    if(!this.path) this.path = '/products'
    this.fos.pathSetter(this.path)
    // this.nextPage()
    this.filterKey = this.key
    this.firstCall = false

    this.fetchedDataSub$ = this.cache.getCollection(this.path, this.key, this.queryChange)
    this.fetchedData$ = this.fetchedDataSub$.asObservable().pipe(switchMap(v=>v), tap({
      next: a=> {
        if(a.length && a.length>0){
          this.isFetched = true
          if(this.mode) this.fetchedArray.emit(a)
        }},
      error: ()=>alert('Error al cargar bases de datos, favor de recargar'),
      complete: ()=>console.log('Complete')
    }))
  }

  setActiveProduct(element: any, index: number): void {
    this.currentIndex = index
    this.selectedElement.emit({element: element, index: index})
  }

  nextPage() {

    var obs = this.fos.filterByKeyBatch<Object>(this.key, this.queryChange,this.exact).pipe(tap({
      next: a=> {
      if(a.length && a.length>0){
        this.isFetched = true
        if(this.mode) this.fetchedArray.emit(a)
      }},
    error: ()=>alert('Error al cargar bases de datos, favor de recargar'),
    complete: ()=>console.log('Complete')
    }, ),)

    this.fetchedDataSub$.next(obs)
  }


  resetPagination():void{
    this.disableNext = false;
    this.disablePrev = true;
    this.currentIndex = -1;
    this.currentElement = undefined
  }


  ngOnChanges(changes: SimpleChanges) {
    if(this.firstCall) return
    this.isFetched = false
    
    if(changes['path']){
      this.fos.pathSetter(changes['path'].currentValue)  
    }

    if(changes['query']){ 
      
      if(changes['query'].currentValue instanceof Object){
       this.queryChange = changes['query'].currentValue.value 
       this.key = changes['query'].currentValue.key ? changes['query'].currentValue.key : this.filterKey 
       this.exact = changes['query'].currentValue.exact ? true:false
      }else{
        this.queryChange = changes['query'].currentValue
        this.key = this.filterKey
        this.exact = false
      }
      
      console.log(this.key, this.queryChange)
    }
    this.filterProducts();
  }
  
  filterProducts(): void {
    this.resetPagination()
    this.nextPage() 
  }

}
