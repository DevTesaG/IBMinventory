import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { InvRawMaterial } from '../models/inventory/invRawMaterial.model';
import { Observable, map, of, take } from 'rxjs';
import { Timestamp } from 'firebase/firestore'

@Injectable({
  providedIn: 'root'
})
export class InvRMService {

  
  private dbPath = '/RMreport';

  InvRawMaterialsRef: AngularFirestoreCollection<InvRawMaterial>;

  constructor(private db: AngularFirestore) {
    this.InvRawMaterialsRef = db.collection(this.dbPath);
  }
  
  getNextBatch(batch:number, last: any): AngularFirestoreCollection<InvRawMaterial>{ 
    if(last){
      return this.db.collection(this.dbPath, ref=> ref.orderBy('materialId', 'desc').startAfter(last.materialId).limit(batch))
    }
  
    return this.db.collection(this.dbPath, ref=> ref.orderBy('materialId', 'desc').limit(batch))
  }
  
  getAll(): AngularFirestoreCollection<InvRawMaterial> {
    return this.InvRawMaterialsRef;
  }

  create(InvRawMaterial: InvRawMaterial): any {
    return this.InvRawMaterialsRef.add({ ...InvRawMaterial });
  }

  update(id: string, data: any): Promise<void> {

    console.log('Update',id, data)
    return this.InvRawMaterialsRef.doc(id).update({timestamp:  Timestamp.fromDate(new Date()), ...data});
  }

  delete(id: string): Promise<void> {
    return this.InvRawMaterialsRef.doc(id).delete();
  }

  getStock(id?:string): Observable<InvRawMaterial> {
    if(!id) return of<InvRawMaterial>({});

    var stock:InvRawMaterial = {};

  
      return this.db.collection<InvRawMaterial>(this.dbPath, ref => ref.where('materialId', '==', id)).snapshotChanges().pipe(
        map(ch => ch.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))),
        map(data => stock = {
          id:  data.at(0)?.id,
          available:  data.at(0)?.available,
          wating:  data.at(0)?.wating,
          watingCommited:  data.at(0)?.watingCommited,
          commited:  data.at(0)?.commited
        } as InvRawMaterial),
        take(1)
      )
  }

  filterByDateBatch(sDate: any, eDate:any, name:any,  batch:number, last:any):  AngularFirestoreCollection<InvRawMaterial> {
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

  filterByNameBatch(name: string, batch:number, last:any):  AngularFirestoreCollection<InvRawMaterial> {
    if(last){
      return this.db.collection(this.dbPath, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff').orderBy('name', 'desc').startAfter(last.name).limit(batch))
    }
    return this.db.collection(this.dbPath, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff').orderBy('name', 'desc').limit(batch))
  }

  filterByCodeBatch(code: string, batch:number, last:any):  AngularFirestoreCollection<InvRawMaterial> {
    if(last){
      return this.db.collection(this.dbPath, ref => ref.where('code', '>=', code).where('code', '<=',  code+ '\uf8ff').orderBy('code', 'desc').startAfter(last.code).limit(batch))
    }
    return this.db.collection(this.dbPath, ref => ref.where('code', '>=', code).where('code', '<=',  code+ '\uf8ff').orderBy('code', 'desc').limit(batch))
  }

}
