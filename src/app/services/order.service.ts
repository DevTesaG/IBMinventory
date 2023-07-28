import { Injectable } from '@angular/core';
import { Orders } from '../models/inventory/orders.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private dbPath = '/orders';

  ordersRef: AngularFirestoreCollection<Orders>;

  constructor(private db: AngularFirestore) {
    this.ordersRef = db.collection(this.dbPath);
  }
  
  getNextBatch(batch:number, last: any): AngularFirestoreCollection<Orders>{ 
    if(last){
      return this.db.collection(this.dbPath, ref=> ref.orderBy('timestamp', 'desc').startAfter(last).limit(batch))
    }
  
    return this.db.collection(this.dbPath, ref=> ref.orderBy('timestamp', 'desc').limit(batch))
  }
  
  getPrevBatch(batch:number, prev:any, first:any): AngularFirestoreCollection<Orders>{
    return this.db.collection(this.dbPath, ref=> ref.orderBy('timestamp', 'desc').startAt(prev).endBefore(first).limit(batch))
  }

  getBatch(batch:number): AngularFirestoreCollection<Orders>{
    return this.db.collection(this.dbPath, ref=> ref.limit(batch).orderBy('timestamp', 'desc'))
  }

  getAll(): AngularFirestoreCollection<Orders> {
    return this.ordersRef;
  }

  getById(id:string) {
    // return this.db.collection(this.dbPath, ref => ref.orderBy('product_id').where('product_id', '==', id))
    return this.db.collection(this.dbPath, ref => ref.where('product_id', '==', id))
  }

  create(orders: Orders): any {
    return this.ordersRef.add({ ...orders });
  }

  update(id: string, data: any): Promise<void> {
    return this.ordersRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.ordersRef.doc(id).delete();
  }

  filterByName(name: string):  AngularFirestoreCollection<Orders> {
    return this.db.collection(this.dbPath, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff'))
  }
  
  filterByCode(code: string):  AngularFirestoreCollection<Orders> {
    return this.db.collection(this.dbPath, ref => ref.where('code', '>=', code).where('code', '<=',  code+ '\uf8ff'))
  }
}
