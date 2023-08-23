import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, } from '@angular/fire/compat/firestore';
import { invFinishedProduct } from '../models/inventory/invFinishedProduct.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvFPService {

 
  private dbPath = '/FPreport';

  invFinishedProductsRef: AngularFirestoreCollection<invFinishedProduct>;

  constructor(private db: AngularFirestore) {
    this.invFinishedProductsRef = db.collection(this.dbPath);
  }
  
  getNextBatch(batch:number, last: any): AngularFirestoreCollection<invFinishedProduct>{ 
    if(last){
      return this.db.collection(this.dbPath, ref=> ref.orderBy('timestamp', 'desc').startAfter(last.timestamp).limit(batch))
    }
  
    return this.db.collection(this.dbPath, ref=> ref.orderBy('timestamp', 'desc').limit(batch))
  }

  async getStock(id?:string): Promise<invFinishedProduct>{
    if(!id) return {}

    var stock:invFinishedProduct = {};

    return new Promise( async r => {
      this.invFinishedProductsRef.doc(id).get().pipe(map((c:any) => ({id: c.id, prod: c.data()}))
      ).subscribe((data:any) =>{
        if(!data) return
        stock = {
          id:  data.id,
          available:  data.prod.available,
          wating:  data.prod.wating,
          commited:  data.prod.commited
        }
          r(stock)
      })
    })
  }


  getAll(): AngularFirestoreCollection<invFinishedProduct> {
    return this.invFinishedProductsRef;
  }

  create(invFinishedProduct: invFinishedProduct): any {
    return this.invFinishedProductsRef.add({ ...invFinishedProduct });
  }

  update(id: string, data: any,): Promise<void> {
    return this.invFinishedProductsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.invFinishedProductsRef.doc(id).delete();
  }

  filterByNameBatch(name: string, batch:number, last:any):  AngularFirestoreCollection<invFinishedProduct> {
    if(last){
      return this.db.collection(this.dbPath, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff').orderBy('name', 'desc').startAfter(last.name).limit(batch))
    }
    return this.db.collection(this.dbPath, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff').orderBy('name', 'desc').limit(batch))
  }

  filterByCodeBatch(code: string, batch:number, last:any):  AngularFirestoreCollection<invFinishedProduct> {
    if(last){
      return this.db.collection(this.dbPath, ref => ref.where('code', '>=', code).where('code', '<=',  code+ '\uf8ff').orderBy('code', 'desc').startAfter(last.code).limit(batch))
    }
    return this.db.collection(this.dbPath, ref => ref.where('code', '>=', code).where('code', '<=',  code+ '\uf8ff').orderBy('code', 'desc').limit(batch))
  }
}
