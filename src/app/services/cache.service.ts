import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { FirestoreOperationService } from './firestore-operation.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private hashMapRoutes: Map<string, BehaviorSubject<Observable<any[]>>> = new Map()  
  
  constructor(private fos: FirestoreOperationService) { }


  
  getCollection(path:string, key?:string, value?:string, forceUpdate?:boolean){
    console.log(this.hashMapRoutes.has(path))

    if(!forceUpdate && this.hashMapRoutes.has(path)){
      return this.hashMapRoutes.get(path) ?? new BehaviorSubject(of([{}]))

    }
    
    if(this.hashMapRoutes.has(path)){
      this.hashMapRoutes.get(path)?.next(this.performGetRequest(path, key, value))
    }else{
      this.hashMapRoutes.set(path, new BehaviorSubject(this.performGetRequest(path, key, value)))
    }
    console.log(this.hashMapRoutes.has(path)) 
    return this.hashMapRoutes.get(path) ?? new BehaviorSubject(of([{}]))
  }


  // updateCollection(path:string, newData:any){
  //   this.hashMapRoutes.set(path, new BehaviorSubject(this.performUpdateRequest(path, newData)))  
  // }

  performGetRequest(path:string, key?:string, value?:string){
    this.fos.pathSetter(path)
    return this.fos.filterByKeyBatch(key, value).pipe(tap(a => this.hashMapRoutes.get(path)?.next(of(a))))
  }

  // performUpdateRequest(path:string, {id, ...newObj}:{id:string, newObj:Object}){
  //   this.fos.pathSetter(path)
  //   return this.fos.update(id, newObj).pipe(switchMap(()=> {

  //   }))
  // }

}
