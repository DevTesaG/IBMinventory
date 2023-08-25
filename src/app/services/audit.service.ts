import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Timestamp } from 'firebase/firestore'

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  private dbPath = '/audit';

  objectsRef: AngularFirestoreCollection<object>;

  constructor(private db: AngularFirestore) {
    this.objectsRef = db.collection(this.dbPath);
  }
  
  getNextBatch(batch:number, last: any): AngularFirestoreCollection<object>{ 
    if(last){
      return this.db.collection(this.dbPath, ref=> ref.orderBy('timestamp', 'desc').startAfter(last.timestamp).limit(batch))
    }
  
    return this.db.collection(this.dbPath, ref=> ref.orderBy('timestamp', 'desc').limit(batch))
  }

  create(operation: any, process: any, user:any, posterior:any,prior?:any, itemId?:string): any {

    var auditReport:any = {
      name: operation, 
      process: process,
      posterior:posterior,
      timestamp: Timestamp.fromDate(new Date()),
      user: user
    }
    
    if(prior)
    auditReport.prior = prior
    if(itemId)
    auditReport.itemId = itemId

    return this.objectsRef.add({ ...auditReport });
  }

  update(id: string, data: any): Promise<void> {
    return this.objectsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.objectsRef.doc(id).delete();
  }

  filterByDateBatch(sDate: any, eDate:any, name:any,  batch:number, last:any):  AngularFirestoreCollection<object> {
    console.log(name)
    // if(last){
    //   return this.db.collection(this.dbPath, ref => ref.where('timestamp', '>=', sDate).where('timestamp', '<=', eDate).orderBy('timestamp', 'desc').startAfter(last.name).limit(batch))
    // }
    // if(name){
    //   sDate= `${sDate.toDate().toLocaleDateString()}_name`
    //   eDate= `${eDate.toDate().toLocaleDateString()}_name`
    //   return this.db.collection(this.dbPath, ref => ref.where('timestampName', '>=', sDate).where('timestampName', '<=', eDate).orderBy('timestampName', 'desc').limit(batch))
    // }
    // return this.db.collection(this.dbPath, ref => ref.startAt('timestamp',sDate).endAt('timestamp', eDate).where('name','==', name).orderBy('timestamp', 'desc').limit(batch))
    return this.db.collection(this.dbPath, ref => ref.where('timestamp', '>=', sDate).where('timestamp', '<=', eDate).where('name','==', name).orderBy('timestamp', 'desc').limit(batch))
  }

  filterByNameBatch(name: string, batch:number, last:any):  AngularFirestoreCollection<object> {
    if(last){
      return this.db.collection(this.dbPath, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff').orderBy('name', 'desc').startAfter(last.name).limit(batch))
    }
    return this.db.collection(this.dbPath, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff').orderBy('name', 'desc').limit(batch))
  }

  filterByCodeBatch(code: string, batch:number, last:any):  AngularFirestoreCollection<object> {
    if(last){
      return this.db.collection(this.dbPath, ref => ref.where('code', '>=', code).where('code', '<=',  code+ '\uf8ff').orderBy('code', 'desc').startAfter(last.code).limit(batch))
    }
    return this.db.collection(this.dbPath, ref => ref.where('code', '>=', code).where('code', '<=',  code+ '\uf8ff').orderBy('code', 'desc').limit(batch))
  }
}
