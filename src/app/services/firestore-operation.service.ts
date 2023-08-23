import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreOperationService {

  // private path2 = '/products';

  private pagination: {
    query?: string,
    filterType: boolean,
    filterKey: string,
    productsPerCall: number,
    disableNext:boolean,
    disablePrev: boolean,
    lastInResponses:any[],
    requestDataArray: any[]
  }




  objectRef: AngularFirestoreCollection<any>;

  // constructor(private db: AngularFirestore) {
  constructor(private db: AngularFirestore, @Inject('path') private path: string) {
    this.objectRef = db.collection(this.path);
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

  pathSetter(path:string){
    this.path = path;
    this.objectRef = this.db.collection(this.path);
  }

  pathGetter(){
    return this.path
  }

  paginationSetter(pagination: any){
    this.pagination = pagination
    return this
  }

  paginationGetter(){
    return this.pagination
  }

  
async nextPage<S>(direction: boolean) {
  
  var anchor:any;
  console.log(this.pagination.disablePrev)
  if(direction){
    if(this.pagination.disableNext) return;
    
    if(this.pagination.requestDataArray.length){
      this.pagination.lastInResponses?.push(this.pagination.requestDataArray[this.pagination.requestDataArray.length - 1])
    }  
    anchor = this.pagination.lastInResponses?.length ? this.pagination.lastInResponses[this.pagination.lastInResponses?.length - 1]: undefined;
    console.log(anchor)
  }else{
    if(this.pagination.disablePrev) return;
    this.pagination.lastInResponses?.pop();
    anchor = this.pagination.lastInResponses?.pop();
  }
  
  
  
  console.log('Info:', anchor, this.pagination.lastInResponses,this.pagination.productsPerCall ,this.pagination.query)
  var req: AngularFirestoreCollection<S>;
  if(this.pagination.query){
      // req = this.filterByKeyBatch<S>(this.pagination.filterKey, this.pagination.query,this.pagination.productsPerCall, anchor)
      req = this.filterByNameBatch<S>(this.pagination.query,this.pagination.productsPerCall, anchor)
  } else{
    req = this.getNextBatch<S>(this.pagination.productsPerCall, anchor)
  }
  
    return new Promise(r => {
      req.snapshotChanges().pipe(
      map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() })))
      ).subscribe({
          next: data => {
                if(!data.length){
                  this.pagination.disableNext = true;
                  this.pagination.lastInResponses.pop()
                  return;
                }
                console.log(data)
                this.pagination.requestDataArray = data;
                this.pagination.disableNext = data.length < this.pagination.productsPerCall; //What if last batch is exactly productPerCall
                this.pagination.disablePrev = anchor ? false: true
                r(this.pagination)
              },
          error: error => { this.pagination.disableNext = false;}
      });
    })
  }

  
  getNextBatch<S>(batch:number, last: any): AngularFirestoreCollection<S>{ 
    if(last){
      return this.db.collection(this.path, ref=> ref.orderBy('timestamp', 'desc').startAfter(last.timestamp).limit(batch))
    }
  
    return this.db.collection(this.path, ref=> ref.orderBy('timestamp', 'desc').limit(batch))
  }


  getAll<S>(): AngularFirestoreCollection<S> {
    return this.objectRef;
  }

  getByKey(key:string, value:string) {
    // return this.db.collection(this.path, ref => ref.orderBy('product_id').where('product_id', '==', id))
    return this.db.collection(this.path, ref => ref.where(key, '==', value))
  }

  create<S>(object: S):any{
    return this.objectRef.add({ ...object });
  }

  update(id: string, data: any): Promise<void> {
    return this.objectRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.objectRef.doc(id).delete();
  }


   filterByNameBatch<S>(name: string, batch:number, last:any):  AngularFirestoreCollection<S> {
    if(last){
      return this.db.collection(this.path, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff').orderBy('name', 'desc').startAfter(last.name).limit(batch))
    }
    this.pagination.lastInResponses = []
    this.pagination.requestDataArray = []
    this.pagination.disableNext = false;
    this.pagination.disablePrev = true;

    return this.db.collection(this.path, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff').orderBy('name', 'desc').limit(batch))
  }


  
  filterByKeyBatch<S>(key:string, value: string, batch:number, last:any):  AngularFirestoreCollection<S> {
    console.log(key, value, last)
    if(last){
      console.log(last[key])
      return this.db.collection(this.path, ref => ref.where(key, '>=', value).where(key, '<=',  value+ '\uf8ff').orderBy(key, 'desc').startAfter(last[key]).limit(batch))
    }
      return this.db.collection(this.path, ref => ref.where(key, '>=', value).where(key, '<=',  value+ '\uf8ff').orderBy(key, 'desc').limit(batch))
  }
}

