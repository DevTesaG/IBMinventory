import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductMaterialsComponent } from './product-materials/product-materials.component';

const routes: Routes = [
  
  {path:'', component:ProductListComponent},
  {path:'add', component:AddProductComponent},
  {path:'material', component:ProductMaterialsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
