import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMaterialComponent } from './add-material/add-material.component';
import { MaterialListComponent } from './material-list/material-list.component';

const routes: Routes = [
  { path: '', component: MaterialListComponent },
  { path: 'add', component: AddMaterialComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }
