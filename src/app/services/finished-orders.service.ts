import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Orders } from '../models/inventory/orders.model';
import { bufferCount, concat, concatAll, from, map, mergeMap, switchMap, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Timestamp } from 'firebase/firestore'

@Injectable({
  providedIn: 'root'
})
export class FinishedOrdersService {

  
  private dbPath = '/finishedOrders';

  productsRef: AngularFirestoreCollection<Orders>;

  constructor(private db: AngularFirestore, private ht: HttpClient) {
    this.productsRef = db.collection(this.dbPath);
  }
  
  getById(id:string){
    return this.productsRef.doc(id).get()
  }


  getAll(): AngularFirestoreCollection<Orders> {
    return this.productsRef;
  }

  create(order: Orders): any {
    return this.productsRef.add({ ...order });
  }



  downloadFile(data:any, filename = `Ordenes Terminadas_${new Date().toLocaleString('es-MX')}`) {

    
    console.log(data)
    let csvData = this.ConvertToCSV(data, Object.keys(data[0]));
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData],
        { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') !=
        -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {

        // If Safari open in new window to
        // save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
}

ConvertToCSV(objArray:any[], headerList:any[]) {
    let array = typeof objArray !=
        'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';

    for (let index in headerList) {
        row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
        let line = (i + 1) + '';
        for (let index in headerList) {
            let head = headerList[index];
            line += ',' + array[i][head];
        }
        str += line + '\r\n';
    }
    return str;
}



  uploadAll():any {
    return this.ht.get("../../../assets/csvjson.json").pipe(
      tap(console.log),
      concatAll(),
      bufferCount(50),
      map(a => {
        var batch = this.db.firestore.batch()
        a.map( (d:any) => {
          const {id, ...data} = d;
          batch.set( this.db.collection(this.dbPath).doc(id).ref, data);
          return  batch.set( this.db.collection('/FPreport').doc(id).ref,{name: data.name,  available: 0, commited: 0, wating: 0, timestamp: Timestamp.fromDate(new Date())});
        })
        return batch.commit()
      }),
      tap({complete: ()=> alert('completo'), error: ()=> alert('error')})
    )
  }

  deleteAll(): any {
    return this.productsRef.get().pipe(
      map(d => d.docs),
      tap(d => this.downloadFile(d.map(f => f.data()))),
      concatAll(),
      bufferCount(500),
      mergeMap(chunk => {
        var batch = this.db.firestore.batch()
        chunk.map(doc => batch.delete(doc.ref))
        return batch.commit()
      }),
    )
  }

}
