import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialRoutingModule } from './material-routing.module';
import { AddMaterialComponent } from './add-material/add-material.component';
import { MaterialDetailsComponent } from './material-details/material-details.component';
import { MaterialListComponent } from './material-list/material-list.component';
import { SharedModule } from '../shared/shared.module';
import { AddProviderComponent } from './add-provider/add-provider.component';


@NgModule({
  declarations: [
    AddMaterialComponent,
    MaterialDetailsComponent,
    MaterialListComponent,
    AddProviderComponent
  ],
  imports: [
    CommonModule,
    MaterialRoutingModule,
    SharedModule
  ],
})
export class MaterialModule { }
