import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Provider } from '../models/catalogue/provider.model';
import { Observable, concatAll, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

    
  private dbPath = '/providers';

  ProvidersRef: AngularFirestoreCollection<Provider>;

  constructor(private db: AngularFirestore) {
    this.ProvidersRef = db.collection(this.dbPath);
  }
  
  getNextBatch(batch:number, last: any): AngularFirestoreCollection<Provider>{ 
    if(last){
      return this.db.collection(this.dbPath, ref=> ref.orderBy('materialId', 'desc').startAfter(last.materialId).limit(batch))
    }
  
    return this.db.collection(this.dbPath, ref=> ref.orderBy('materialId', 'desc').limit(batch))
  }
  
  getAll(): AngularFirestoreCollection<Provider> {
    return this.ProvidersRef;
  }
  
  getById(matId:any): Observable<Provider | undefined> {
    return this.ProvidersRef.doc(matId).valueChanges({idField: 'id'});
  }

  create(Provider: Provider): any {
    return this.ProvidersRef.add({ ...Provider });
  }

  update(id: string, data: any): Promise<void> {

    console.log('Update',id, data)
    return this.ProvidersRef.doc(id).update(data);
  }

  delete(id: string): any {
    return this.db.collection(this.dbPath, ref=> ref.where('materialId', '==', id)).get().pipe(
      map(d => d.docs),
      concatAll(),
      mergeMap(d => d.ref.delete())
    )
  }

  async getProvidersByMaterial(id?:string): Promise<Provider[]>{
    if(!id) return []

    return new Promise( async r => {
      this.db.collection<Provider>(this.dbPath, ref => ref.where('materialId', '==', id)).snapshotChanges().pipe(
       map(ch => ch.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() })))).subscribe(data => {    
        r(data)
      });    
    })
  }

  filterByNameBatch(name: string, batch:number, last:any):  AngularFirestoreCollection<Provider> {
    if(last){
      return this.db.collection(this.dbPath, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff').orderBy('name', 'desc').startAfter(last.name).limit(batch))
    }
    return this.db.collection(this.dbPath, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff').orderBy('name', 'desc').limit(batch))
  }


}
