import { Inject, Injectable } from '@angular/core';
import { Product } from '../models/catalogue/product.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  
  private dbPath = '/products';

  productsRef: AngularFirestoreCollection<Product>;

  constructor(private db: AngularFirestore) {
    this.productsRef = db.collection(this.dbPath);
  }
  
  getById(id:string){
    return this.productsRef.doc(id).get()
  }

  getNextBatch<S>(batch:number, last: any): AngularFirestoreCollection<S>{ 
    if(last){
      return this.db.collection(this.dbPath, ref=> ref.orderBy('timestamp', 'desc').startAfter(last.timestamp).limit(batch))
    }
  
    return this.db.collection(this.dbPath, ref=> ref.orderBy('timestamp', 'desc').limit(batch))
  }
  
  getPrevBatch(batch:number, prev:any, first:any): AngularFirestoreCollection<Product>{
    return this.db.collection(this.dbPath, ref=> ref.orderBy('timestamp', 'desc').startAt(prev).endBefore(first).limit(batch))
  }

  getBatch(batch:number): AngularFirestoreCollection<Product>{
    return this.db.collection(this.dbPath, ref=> ref.limit(batch).orderBy('timestamp', 'desc'))
  }

  getAll(): AngularFirestoreCollection<Product> {
    return this.productsRef;
  }

  create(Product: Product): any {
    return this.productsRef.add({ ...Product });
  }

  update(id: string, data: any): Promise<void> {
    return this.productsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.productsRef.doc(id).delete();
  }

  filterByNameBatch(name: string, batch:number, last:any):  AngularFirestoreCollection<Product> {
    if(last){
      return this.db.collection(this.dbPath, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff').orderBy('name', 'desc').startAfter(last.name).limit(batch))
    }
    return this.db.collection(this.dbPath, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff').orderBy('name', 'desc').limit(batch))
  }


  filterByCodeBatch(code: string, batch:number, last:any):  AngularFirestoreCollection<Product> {
    if(last){
      return this.db.collection(this.dbPath, ref => ref.where('code', '>=', code).where('code', '<=',  code+ '\uf8ff').orderBy('code', 'desc').startAfter(last.code).limit(batch))
    }
    return this.db.collection(this.dbPath, ref => ref.where('code', '>=', code).where('code', '<=',  code+ '\uf8ff').orderBy('code', 'desc').limit(batch))
  }

  filterByName(name: string):  AngularFirestoreCollection<Product> {
    return this.db.collection(this.dbPath, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff'))
  }
  
  filterByCode(code: string):  AngularFirestoreCollection<Product> {
    return this.db.collection(this.dbPath, ref => ref.where('code', '>=', code).where('code', '<=',  code+ '\uf8ff'))
  }







  



  // nextPage(direction: boolean) {
  
  //   var anchor: any;
    
  //   if(direction){
  //     if(this.disableNext) return;
      
  //     if(this.Products?.length){
  //       this.lastInResponses?.push(this.Products[this.Products.length - 1])
  //     }  
  //     anchor = this.lastInResponses?.length ? this.lastInResponses[this.lastInResponses?.length - 1]: undefined;
  //   }else{
  //     if(this.disablePrev) return;
  //     this.lastInResponses?.pop();
  //     anchor = this.lastInResponses?.pop();
  //   }
  
  //   var req;
  //   if(this.queryChange){
  //     if(this.codeFilter){
  //       req = this.filterByCodeBatch(this.queryChange,this.productsPerCall, anchor)
  //     }else{
  //       req = this.filterByNameBatch(this.queryChange,this.productsPerCall, anchor)
  //     }
  //   } else{
  //     req = this.getNextBatch<Product>(this.productsPerCall, anchor)
  //   }
  
  //   req.snapshotChanges().pipe(
  //       map(changes => changes.map(c => 
  //           ({ id: c.payload.doc.id, ...c.payload.doc.data() })
  //         )
  //       )
  //     ).subscribe(data => {
  //       console.log(data)
  //       if(!data.length){
  //         this.disableNext = true;
  //         return;
  //       }
  
  //       this.Products = data;
  //       this.disableNext = data.length < this.productsPerCall; //What if last batch is exactly productPerCall
  //       this.disablePrev = anchor ? false: true
  //     }, error => {
  //       this.disableNext = false;
  //   });
  //   }
  



}
