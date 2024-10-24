import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ProvidersListComponent } from './providers-list/providers-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProvidersListComponent
  ],
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    SharedModule
  ]
})
export class ProvidersModule { }
