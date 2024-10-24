import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, first, from, map, take, tap } from 'rxjs';

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
  
  getNextBatch<S>(): Observable<S[]>{ 
    return this.db.collection(this.path).get().pipe(
      tap((a)=>console.log('From Firestore: ', a)),
      map(s => s.docs.map((e:any) => ({id:e.id, ...e.data()})))
    )
  }


  getAll<S>(): AngularFirestoreCollection<S> {
    return this.objectRef;
  }

  getByKey(key:string, value:string) {
    return this.db.collection(this.path, ref => ref.where(key, '==', value))
  }

  create<S>(object: S, id?:string):any{

    if(id) return this.objectRef.doc(id).set(object)

    return this.objectRef.add({ ...object });
  }

  update(id: string, data: any): Observable<void> {
    return from(this.objectRef.doc(id).update(data))
  }

  delete(id: string): Promise<void> {
    return this.objectRef.doc(id).delete();
  }


   filterByNameBatch<S>(name: string, batch:number, last:any):  AngularFirestoreCollection<S> {
      return this.db.collection(this.path, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff').orderBy('name', 'desc'))
  }

  filterUrgent<S>(date:any):  Observable<S[]> {
    return this.db.collection(this.path, ref => ref.where('orderDeadline', '<=', date).orderBy('orderDeadline', 'asc')).get().pipe(
      map(s => s.docs.map((e:any) => ({id:e.id, ...e.data()})))
    )
  }

  filterByKeyBatch<S>(key?:string, value?: string,exact?:boolean):  Observable<S[]> {
    if(!(key && value)) return this.getNextBatch()

    if(key == 'orderDeadline') return this.filterUrgent(value)
    
    if(exact)
    return this.db.collection(this.path, ref => ref.where(key, '==', value).orderBy('timestamp', 'desc')).get().pipe(
      map(s => s.docs.map((e:any) => ({id:e.id, ...e.data()}))) 
    )
      
    return this.db.collection(this.path, ref => ref.where(key, '>=', value).where(key, '<=',  value+ '\uf8ff').orderBy(key, 'desc')).get().pipe(
      map(s => s.docs.map((e:any) => ({id:e.id, ...e.data()})))
    )
  }
}

