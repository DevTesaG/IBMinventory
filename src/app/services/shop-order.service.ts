import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ShopRM } from '../models/shopping/shopRM.model';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopOrderService {

  
  private dbPath = '/shopOrder';
  InvRawMaterialsRef: AngularFirestoreCollection<ShopRM>;


  constructor(private db: AngularFirestore) {
    this.InvRawMaterialsRef = db.collection(this.dbPath);
  }

  getNextBatch(batch:number, last: any): AngularFirestoreCollection<ShopRM>{ 
    if(last){
      return this.db.collection(this.dbPath, ref=> ref.orderBy('emissionDate', 'asc').startAfter(last).limit(batch))
    }
  
    return this.db.collection(this.dbPath, ref=> ref.orderBy('emissionDate', 'asc').limit(batch))
  }

  create(id:string,name:string,required:number, requestedAmount: number, orderDeadline:any, price:number, orderId?:string, orderCode?:string){
    var data:any = { 
      materialId: id, 
      price: price,
      name:name, 
      requiredMaterial: required, 
      requestedAmount: requestedAmount, 
      orderDeadline: orderDeadline, 
      emissionDate: new Date(), 
      timestamp: new Date(),
    }
    if(orderId) {
      data.orderId = orderId
    }
    if(orderCode){
      data.orderCode = orderCode  
    }
    return from(this.InvRawMaterialsRef.add(data));
  }

  update(id: string, data: any): Promise<void> {
    return this.InvRawMaterialsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.InvRawMaterialsRef.doc(id).delete();
  }


  filterUrgentatch(date:any, batch:number, last:any):  AngularFirestoreCollection<ShopRM> {
    if(last){
      return this.db.collection(this.dbPath, ref => ref.where('orderDeadline', '<=', date).orderBy('orderDeadline', 'asc').startAfter(last.name).limit(batch))
    }
    return this.db.collection(this.dbPath, ref => ref.where('orderDeadline', '<=', date).orderBy('orderDeadline', 'asc').limit(batch))
  }
}
