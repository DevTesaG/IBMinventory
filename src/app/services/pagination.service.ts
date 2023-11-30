import { Injectable } from '@angular/core';
import { FirestoreOperationService } from './firestore-operation.service';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {


  currentElement?: Object
  currentIndex?: number = -1
  isFetched = false;
  firstCall = true;
  
  disableNext = false;
  disablePrev = true;
  
  updateProducts = false;
  elementArray:any[] = []
  lastInResponses:any[] = []
  cached:any[] = []
  queryChange?:any = undefined;
  filterKey:string = 'name';
  exact:boolean = false;
  elementPerCall:number = 2

  req$?: AngularFirestoreCollection<Object>;
  key:string = 'name';

  constructor(private fos: FirestoreOperationService) { }

  public set path(path:string){
    this.fos.pathSetter(path);
  }

  get nextRequest$(){
    return this.req$
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

    if(this.queryChange){
      this.req$ = this.fos.filterByKeyBatch<Object>(this.key, this.queryChange, this.elementPerCall, anchor, this.exact)
    } else{
      this.req$ = this.fos.getNextBatch<Object>(this.elementPerCall, anchor) 
    }
    
    this.req$.get().pipe(
      map(changes => changes.docs.map(c =>  ({ id: c.id,...c.data()}))),
      tap( (data:any) => {
        if(!data.length){
          this.disableNext = true;
          this.lastInResponses?.pop();
          return;
        }
        this.elementArray = data;
        this.disableNext = data.length < this.elementPerCall;
        this.disablePrev = anchor ? false: true
        this.isFetched = true;
        
      })
    );
  }

  
  resetPagination():void{
    this.disableNext = false;
    this.disablePrev = true;
    this.currentIndex = -1;
    this.currentElement = undefined
    this.elementArray = []
    this.lastInResponses = []
  }

  filterProducts(): void {
    this.resetPagination()
    this.nextPage(true) 
  }

}
