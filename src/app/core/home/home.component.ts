import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormProp } from 'src/app/models/form-prop.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  formObj: FormProp[][] = [
    [new FormProp('Nombre' ,'fullname', 'text'), new FormProp('Nombre de Usuario' ,'username', 'text')],
    [new FormProp('Correo Electronico' ,'email', 'text')],
    [new FormProp('Password' ,'password', 'password'), new FormProp('Confirmar Password' ,'Confirm Password', 'password')],
    // [new FormProp(false,'Aceptar los Terminos' ,'Accept Terms', 'radio', 'form-check-input')],
  ]

  submit(user: any){
    console.log(user)
  }

}
