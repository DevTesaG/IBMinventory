import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryListComponent } from './history-list/history-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HistoryListComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    FormsModule
  ]
})
export class HistoryModule { }
