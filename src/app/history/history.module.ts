import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryListComponent } from './history-list/history-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HistoryListComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    FormsModule,
    SharedModule
    
  ]
})
export class HistoryModule { }
