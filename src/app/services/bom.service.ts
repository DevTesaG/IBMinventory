import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class BomService {
  
  private dbPath = '/bom';

  bomRef: AngularFirestoreCollection<Object>;

  constructor(private db: AngularFirestore) {
    this.bomRef = db.collection(this.dbPath);
  }
  
  getNextBatch(batch:number, last: any): AngularFirestoreCollection<Object>{ 
    if(last){
      return this.db.collection(this.dbPath, ref=> ref.orderBy('timestamp', 'desc').startAfter(last).limit(batch))
    }
  
    return this.db.collection(this.dbPath, ref=> ref.orderBy('timestamp', 'desc').limit(batch))
  }
  
  getPrevBatch(batch:number, prev:any, first:any): AngularFirestoreCollection<Object>{
    return this.db.collection(this.dbPath, ref=> ref.orderBy('timestamp', 'desc').startAt(prev).endBefore(first).limit(batch))
  }

  getBatch(batch:number): AngularFirestoreCollection<Object>{
    return this.db.collection(this.dbPath, ref=> ref.limit(batch).orderBy('timestamp', 'desc'))
  }

  getAll(): AngularFirestoreCollection<Object> {
    return this.bomRef;
  }

  getById(id:string) {
    // return this.db.collection(this.dbPath, ref => ref.orderBy('product_id').where('product_id', '==', id))
    return this.db.collection(this.dbPath, ref => ref.where('product_id', '==', id))
  }

  create(Object: Object): any {
    return this.bomRef.add({ ...Object });
  }

  update(id: string, data: any): Promise<void> {
    return this.bomRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.bomRef.doc(id).delete();
  }

  filterByName(name: string):  AngularFirestoreCollection<Object> {
    return this.db.collection(this.dbPath, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff'))
  }
  
  filterByCode(code: string):  AngularFirestoreCollection<Object> {
    return this.db.collection(this.dbPath, ref => ref.where('code', '>=', code).where('code', '<=',  code+ '\uf8ff'))
  }


  filterByCodeBatch(code: string, batch:number, last:any):  AngularFirestoreCollection<Object> {
    if(last){
      return this.db.collection(this.dbPath, ref => ref.where('code', '>=', code).where('code', '<=',  code+ '\uf8ff').orderBy('code', 'desc').startAfter(last.code).limit(batch))
    }
    return this.db.collection(this.dbPath, ref => ref.where('code', '>=', code).where('code', '<=',  code+ '\uf8ff').orderBy('code', 'desc').limit(batch))
  }

  filterByNameBatch(name: string, batch:number, last:any):  AngularFirestoreCollection<Object> {
    if(last){
      return this.db.collection(this.dbPath, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff').orderBy('name', 'desc').startAfter(last.name).limit(batch))
    }
    return this.db.collection(this.dbPath, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff').orderBy('name', 'desc').limit(batch))
  }

}
