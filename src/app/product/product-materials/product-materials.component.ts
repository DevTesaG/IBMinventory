import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Material } from 'src/app/models/catalogue/material.model';
import { Product } from 'src/app/models/catalogue/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-materials',
  templateUrl: './product-materials.component.html',
  styleUrls: ['./product-materials.component.css']
})
export class ProductMaterialsComponent implements OnInit {

  
  product?: Product;
  currentMaterial?: Material;
  currentIndex = -1;
  title = '';
  
  q = '';
  queryChange?:string = undefined;
  areaFilter= '';
  productMaterials:any[] = []

  

  constructor(private productService:ProductService ,private router: Router) { }

  ngOnInit(): void {
    this.product = history.state
    if(this.product?.materials)
    this.productMaterials = this.product.materials
  }


  filter(){
    this.queryChange = this.q
  }


  getSelectedElement(element: any): void {
    this.currentMaterial = element.element;
    this.currentIndex = element.index;
    this.addMaterialToProduct(this.currentMaterial)
  }

  addMaterialToProduct(material: any){
     var occurence = this.productMaterials.find(e => e.id == material.id)
     if(occurence) return;
     this.productMaterials.push({name: material.name, id: material.id})
  }

  removeMaterialToProduct(materialIndex:any){
    this.productMaterials.splice(materialIndex, 1)
  }

  editMaterials(){
  
    if(!(this.product && this.productMaterials)) return

    var product = { 
      materials: this.productMaterials
    }

    this.productService.update(this.product?.id, product).then(() => {
      alert('Materiales Actualizados Satisfactoriamente')
      this.router.navigate(['products'])
    });
  }
}
