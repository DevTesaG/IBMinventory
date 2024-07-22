import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarnModalComponent } from '../core/warn-modal/warn-modal.component';
import { FormComponent } from '../core/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { ReactiveFormChildComponent } from './reactive-form-child/reactive-form-child.component';



@NgModule({
  declarations: [
    WarnModalComponent,
    FormComponent,
    PaginationComponent,
    ReactiveFormComponent,
    ReactiveFormChildComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    WarnModalComponent,
    FormComponent,
    FormsModule,
    PaginationComponent,
    ReactiveFormComponent
  ]
})
export class SharedModule { }
