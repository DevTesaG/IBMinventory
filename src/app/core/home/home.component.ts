import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { FormProp } from 'src/app/models/form-prop.model';
import { FormComponent } from '../form/form.component';
import { FinishedOrdersService } from 'src/app/services/finished-orders.service';
import { HttpClient } from '@angular/common/http';


interface User{
  email: string
  password:string
  age:number
  doubleAge:number
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  q?:string;
  form:any;
  a:Subscription = new Subscription;

  @ViewChild(FormComponent) child!:FormComponent;

  ngAfterViewInit() {
    var a = this.child.f['productionDays'].valueChanges.pipe(
      tap(v => this.child.f['orderInput'].patchValue(2*v))
    ).subscribe()
  }

  constructor(private fo: FinishedOrdersService) {


    
    // this.fo.uploadAll().subscribe()

    this.form = [
      [new FormProp('Numero de Orden de Pedido' ,'name', 'text'), new FormProp('Estado' ,'state', 'text')],
      [new FormProp('Nombre del Cliente' ,'clientName', 'select', [], ['Oracle', 'Microsoft', 'Sony'])],
      [new FormProp('Fecha de Embarque' ,'shipDate', 'date')],
      [new FormProp('Dias de Produccion' ,'productionDays', 'number', [this.custom]), new FormProp('Pedido de Insumos' ,'orderInput', 'number').setReadOnly(true)],
      [
        new FormProp('Pedido Materia Prima' ,'rmOrderDeadline', 'date'), 
        new FormProp('Limite inicio de Produccion' ,'startProductionDeadline', 'date')
      ],
      [new FormProp('Notas' ,'notes', 'text')]
    ]
  }


  custom(control: AbstractControl){ 
    return control.value > 30 || control.value == null ? null : { 'custom': 'debe ser mayor que 30' }; 
   }

  ngOnInit(): void {
  }

  submit(user: any){
    console.log(user)
  }


  filter(){
    this.q = 'Esc'
  }

  getSelectedElement(element: any){
    console.log(element)
  }

  ngOnDestroy(){
    this.a.unsubscribe();
  }

}
