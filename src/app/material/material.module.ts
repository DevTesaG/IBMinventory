import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialRoutingModule } from './material-routing.module';
import { AddMaterialComponent } from './add-material/add-material.component';
import { MaterialDetailsComponent } from './material-details/material-details.component';
import { MaterialListComponent } from './material-list/material-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AddMaterialComponent,
    MaterialDetailsComponent,
    MaterialListComponent
  ],
  imports: [
    CommonModule,
    MaterialRoutingModule,
    FormsModule,
    SharedModule
  ],
})
export class MaterialModule { }
