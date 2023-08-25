import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreOperationService {


  objectRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore, @Inject('path') private path: string) {
    this.objectRef = db.collection(this.path);
  }

  pathSetter(path:string){
    this.path = path;
    this.objectRef = this.db.collection(this.path);
  }

  pathGetter(){
    return this.path
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
    return this.db.collection(this.path, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff').orderBy('name', 'desc').limit(batch))
  }

  filterUrgent<S>(date:any, batch:number, last:any):  AngularFirestoreCollection<S> {
    if(last){
      return this.db.collection(this.path, ref => ref.where('orderDeadline', '<=', date).orderBy('orderDeadline', 'asc').startAfter(last.name).limit(batch))
    }
    return this.db.collection(this.path, ref => ref.where('orderDeadline', '<=', date).orderBy('orderDeadline', 'asc').limit(batch))
  }
  
  filterByKeyBatch<S>(key:string, value: string, batch:number, last:any, exact?:boolean):  AngularFirestoreCollection<S> {
    
    if(key == 'orderDeadline'){
      return this.filterUrgent(value, batch, last)
    }else{
      if(last){
        if(exact) 
        return this.db.collection(this.path, ref => ref.where(key, '==', value).orderBy('timestamp', 'desc').startAfter(last['timestamp']).limit(batch))
      
        return this.db.collection(this.path, ref => ref.where(key, '>=', value).where(key, '<=',  value+ '\uf8ff').orderBy(key, 'desc').startAfter(last[key]).limit(batch))
      }
      if(exact)
      return this.db.collection(this.path, ref => ref.where(key, '==', value).orderBy('timestamp', 'desc').limit(batch))
      
      return this.db.collection(this.path, ref => ref.where(key, '>=', value).where(key, '<=',  value+ '\uf8ff').orderBy(key, 'desc').limit(batch))
    }
  }
}

