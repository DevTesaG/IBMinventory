import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Client } from '../models/catalogue/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private dbPath = '/clients';

  clientsRef: AngularFirestoreCollection<Client>;

  constructor(private db: AngularFirestore) {
    this.clientsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Client> {
    return this.clientsRef;
  }

  getById(id:string){
    return this.clientsRef.doc(id).get()
  }

  getNextBatch(batch:number, last: any): AngularFirestoreCollection<Client>{ 
    if(last){
      return this.db.collection(this.dbPath, ref=> ref.orderBy('timestamp', 'desc').startAfter(last.timestamp).limit(batch))
    }

    return this.db.collection(this.dbPath, ref=> ref.orderBy('timestamp', 'desc').limit(batch))
  }

  create(Client: Client): any {
    return this.clientsRef.add({ ...Client });
  }

  update(id: string, data: any): Promise<void> {
    return this.clientsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.clientsRef.doc(id).delete();
  }

  filterByName(name: string):  AngularFirestoreCollection<Client> {
    return this.db.collection(this.dbPath, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff'))
  }
  
  filterByCode(code: string):  AngularFirestoreCollection<Client> {
    return this.db.collection(this.dbPath, ref => ref.where('code', '>=', code).where('code', '<=',  code+ '\uf8ff'))
  }

  filterByCodeBatch(){

  }

  filterByNameBatch(){

  }
}
