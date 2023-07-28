import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Material } from 'src/app/models/catalogue/material.model';
import { Product } from 'src/app/models/catalogue/product.model';
import { BomService } from 'src/app/services/bom.service';
import { FirestoreOperationService } from 'src/app/services/firestore-operation.service';
import { MaterialService } from 'src/app/services/material.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-materials',
  templateUrl: './product-materials.component.html',
  styleUrls: ['./product-materials.component.css']
})
export class ProductMaterialsComponent implements OnInit {

  
  @Input() product?: Product;
  @Output() rL: EventEmitter<any> = new EventEmitter();

  Materials?: Material[];
  currentMaterial?: Material;
  currentIndex = -1;
  title = '';
  
  query = '';
  queryChange?:string = undefined;
  areaFilter= '';
  id = ''

  productsPerCall = 2;
  lastInResponses?:any[] = []

  disableNext = false;
  disablePrev = true;

  updateMaterials = false;
  response:any;
  productMaterials:any[] = []

  

  constructor(private MaterialService: MaterialService, private bomService: BomService, private productService:ProductService ,private router: Router) { }

  ngOnInit(): void {
    this.product = history.state
    this.getProductMaterials()
    this.nextPage(true)
    // this.retrieveMaterials();
  }

getProductMaterials(){
  if(!this.product?.id) return 

  this.productService.getById(this.product?.id).pipe(map(c => ({id: c.id, prod: c.data()}))
  ).subscribe(data =>{

    if(!data) return

    console.log(data, data.prod, data.id)

    this.product = data.prod as Product
    this.product.id = data.id   
    this.productMaterials = data.prod?.productMaterials ? data.prod?.productMaterials : [] 
  })
}

  nextPage(direction: boolean) {
  
  var anchor:any;
  console.log(this.disablePrev)
  if(direction){
    if(this.disableNext) return;
    
    if(this.Materials?.length){
      this.lastInResponses?.push(this.Materials[this.Materials.length - 1])
    }  
    anchor = this.lastInResponses?.length ? this.lastInResponses[this.lastInResponses?.length - 1]: undefined;
  }else{
    if(this.disablePrev) return;
    this.lastInResponses?.pop();
    anchor = this.lastInResponses?.pop();
  }
  
  
  
  console.log('Info:', anchor, this.lastInResponses, this.queryChange)
  var req;
  if(this.queryChange){
    if(this.areaFilter){
      req = this.MaterialService.filterByAreaBatch(this.queryChange,this.productsPerCall, anchor)
    }else{
      console.log(this.queryChange)
      req = this.MaterialService.filterByNameBatch(this.queryChange,this.productsPerCall, anchor)
    }
  } else{
    req = this.MaterialService.getNextBatch(this.productsPerCall, anchor)
  }
  
  req.snapshotChanges().pipe(
    map(changes => changes.map(c => 
      ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      if(!data.length){
        this.disableNext = true;
        return;
      }
      console.log(data)
      this.Materials = data;
      this.disableNext = data.length < this.productsPerCall; //What if last batch is exactly productPerCall
      this.disablePrev = anchor ? false: true
      
    }, error => {
      this.disableNext = false;
  });
  }
 

  refreshList(): void {
    this.currentMaterial = undefined;
    this.currentIndex = -1;
    this.retrieveMaterials();
  }

  retrieveMaterials(): void {
    this.MaterialService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.Materials = data;
    });
  }


  filterMaterials(): void {
    this.queryChange = this.query
    this.Materials = []
    this.lastInResponses = []
    this.nextPage(true)
  }

  setActiveMaterial(Material: Material, index: number): void {
    this.currentMaterial = Material;
    this.currentIndex = index;
  }

  addMaterialToProduct(material: any){
     var occurence = this.productMaterials.find(e => e.id == material.id)
     if(occurence) return;
     this.productMaterials.push({name: material.name, id: material.id, deliveryTime: material.deliveryTime, minBatch: material.minBatch})
  }

  removeMaterialToProduct(materialIndex:any){
    this.productMaterials.splice(materialIndex, 1)
  }

  getMaterialWaitMaxTime() {
    return Math.max(...this.productMaterials.map(e=>e.deliveryTime))
  }
  
  editMaterials(){
  
    if(!(this.product && this.productMaterials)) return

    var product = { 
      MaxWaitTime: this.getMaterialWaitMaxTime(),
      materials: this.productMaterials.map((e:any) => ({id:e.id, name:e.name, quantity: e.quantity, minBatch: e.minBatch}))
    }

    this.productService.update(this.product?.id, product).then(() => {
      alert('Materiales Actualizados Satisfactoriamente')
      this.router.navigate(['products'])
    });

    // if(this.updateMaterials){
    //   this.productService.update(this.product?.id, product).then(() => {
    //     console.log(this.id)
    //     // this.bomService.update(this.id, product)
    //     alert('Materiales Actualizados Satisfactoriamente')
    //     this.router.navigate(['products'])
    //   });
    // }else{
    //   this.bomService.create({ product_id: this.product?.id, product}).then(() => {
    //     this.productService.update(this.product?.id, {materialWaitMaxTime: this.getMaterialWaitMaxTime()})
    //     alert('Materiales Actualizados Satisfactoriamente')
    //     this.router.navigate(['products'])
    //   });
    // }
  }
}
