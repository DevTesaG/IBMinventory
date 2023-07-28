import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Material } from '../models/catalogue/material.model';
import { map } from 'rxjs';
import { Product } from '../models/catalogue/product.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private dbPath = '/materials';

  materialsRef: AngularFirestoreCollection<Material>;

  constructor(private db: AngularFirestore) {
    this.materialsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Material> {
    return this.materialsRef;
  }



  // nextPage(pagination: any) {
  
  //   var anchor;
    
  //   if(pagination.direction){
  //     if(pagination.disableNext) {pagination.stop = true; return pagination;}
  
  //     if(pagination.Materials){
  //       pagination.lastInResponses?.push(pagination.Materials[pagination.Materials.length - 1].timestamp)
  //     }  
  //     anchor = pagination.lastInResponses ? pagination.lastInResponses[pagination.lastInResponses?.length - 1]: undefined;
  //   }else{
  //     if(pagination.disablePrev) { pagination.stop = true; return pagination};
  //     pagination.lastInResponses?.pop();
  //     anchor = pagination.lastInResponses?.pop();
  //   }
  
  //   this.getNextBatch(pagination.productsPerCall, anchor).snapshotChanges().pipe(
  //       map(changes => changes.map(c => 
  //           ({ id: c.payload.doc.id, ...c.payload.doc.data() })
  //         )
  //       )
  //     ).subscribe(data => {
  //       if(!data.length){
  //         pagination.disableNext = true;
  //         pagination.stop = true;
  //         return pagination;
  //       }
  
  //       pagination.Materials = data;
  //       pagination.disableNext = data.length < pagination.productsPerCall; //What if last batch is exactly productPerCall
  //       pagination.disablePrev = pagination.lastInResponses?.length ? false: true
  //       return pagination;
  //     }, error => {
  //       pagination.disableNext = false;
  //   });
  //   }
  


  getNextBatch(batch:number, last: any): AngularFirestoreCollection<Material>{ 
    if(last){
      return this.db.collection(this.dbPath, ref=> ref.orderBy('timestamp', 'desc').startAfter(last.timestamp).limit(batch))
    }

    return this.db.collection(this.dbPath, ref=> ref.orderBy('timestamp', 'desc').limit(batch))
  }
  

  create(material: Material): any {
    return this.materialsRef.add({ ...material });
  }

  update(id: string, data: any): Promise<void> | undefined{
    if(!id) return undefined
    return this.materialsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.materialsRef.doc(id).delete();
  }
 
  filterByNameBatchP(name: string, batch:number, last:any):  AngularFirestoreCollection<Product> {
    if(last){
      return this.db.collection('/products', ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff').orderBy('name', 'desc').startAfter(last.name).limit(batch))
    }
    return this.db.collection('/products', ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff').orderBy('name', 'desc').limit(batch))
  }
  
  filterByNameBatch(name: string, batch:number, last:any):  AngularFirestoreCollection<Material> {
    if(last){
      return this.db.collection(this.dbPath, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff').orderBy('name', 'desc').startAfter(last.name).limit(batch))
    }
    return this.db.collection(this.dbPath, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff').orderBy('name', 'desc').limit(batch))
  }

  filterByAreaBatch(area: string, batch:number, last:any):  AngularFirestoreCollection<Material> {
    if(last){
      return this.db.collection(this.dbPath, ref => ref.where('area', '>=', area).where('area', '<=',  area+ '\uf8ff').orderBy('area', 'desc').startAfter(last.area).limit(batch))
    }
    return this.db.collection(this.dbPath, ref => ref.where('area', '>=', area).where('area', '<=',  area+ '\uf8ff').orderBy('area', 'desc').limit(batch))
  }

  filterByName(name: string):  AngularFirestoreCollection<Material> {
    return this.db.collection(this.dbPath, ref => ref.where('name', '>=', name).where('name', '<=',  name+ '\uf8ff'))
  }
}
