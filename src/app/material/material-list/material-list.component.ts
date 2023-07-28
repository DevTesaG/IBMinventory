import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Material } from 'src/app/models/catalogue/material.model';
import { FirestoreOperationService } from 'src/app/services/firestore-operation.service';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css'],
  providers: [FirestoreOperationService, {provide: 'path', useValue: '/materials'}]
})
export class MaterialListComponent implements OnInit {

  Materials: Material[] = [];
  currentMaterial?: Material;
  currentIndex = -1;
  title = '';
  query = '';
  queryChange?:string
  productsPerCall = 2;
  lastInResponses:any[] = []

  disableNext = false;
  disablePrev = true;

  constructor(private fos: FirestoreOperationService, private mats: MaterialService) { }

  ngOnInit(): void {
    this.nextPage(true)
  }


  nextPage(direction: boolean) {
  
    var anchor:any = undefined;
    if(direction){
      if(this.disableNext) return;
      
      anchor = this.Materials.at(-1)
      this.lastInResponses.push(anchor)
    
    }else{
      if(this.disablePrev) return;
      this.lastInResponses?.pop();
      anchor = this.lastInResponses?.at(-1);
    }
    
    console.log(anchor)
    var req: AngularFirestoreCollection<Material>;
    if(this.queryChange){
        req = this.fos.filterByKeyBatch<Material>( 'name', this.queryChange,this.productsPerCall, anchor)
    } 
    else{
      req = this.fos.getNextBatch<Material>(this.productsPerCall, anchor)
    }
    
    
    console.log('Last in response: ',this.lastInResponses, 'Anchor', anchor)
    req.snapshotChanges().pipe(
      map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() })))
      ).subscribe(data => {
        if(!data.length){
          this.disableNext = true;
          this.lastInResponses?.pop()
          return;
        }
        this.Materials = data;
        this.disableNext = data.length < this.productsPerCall;
        this.disablePrev = anchor ? false: true
        
      });
  }

  refreshList(): void {
    this.currentMaterial = undefined;
    this.currentIndex = -1;
    // this.nextPage(true)
  }

 

  filterMaterials(): void {
   
    this.Materials = []
    this.lastInResponses = []
    this.disableNext = false;
    this.disablePrev = true;
    
    this.queryChange = this.query=='' ? undefined: this.query;
   
    console.log('Last in response: ',this.lastInResponses)

    this.nextPage(true)
  }

  setActiveMaterial(Material: Material, index: number): void {
    this.currentMaterial = Material;
    this.currentIndex = index;
  }

}
