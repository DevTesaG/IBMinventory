import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ShopRM } from '../models/shopping/shopRM.model';

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

  create(id:string,name:string,required:number, requestedAmount: number, orderDeadline:any, stockId:any){
    return this.InvRawMaterialsRef.add({ materialId: id, name:name, stockId: stockId ,requiredMaterial: required, requestedAmount: requestedAmount, orderDeadline: orderDeadline, emissionDate: new Date(), timestamp: new Date()});
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
