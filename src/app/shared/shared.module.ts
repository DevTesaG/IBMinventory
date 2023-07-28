import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarnModalComponent } from '../core/warn-modal/warn-modal.component';
import { FormComponent } from '../core/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [
    WarnModalComponent,
    FormComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    WarnModalComponent,
    FormComponent,
    FormsModule
  ]
})
export class SharedModule { }
