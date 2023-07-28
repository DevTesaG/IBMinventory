import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormProp } from 'src/app/models/form-prop.model';




@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  @Output() formModel: EventEmitter<Object> = new EventEmitter<Object>();
  @Input() mode?: boolean = false;
  @Input() btnMes?: string = 'Registrar';
  @Input() modalMessage?: string = '¿ Desea continuar con este proceso ? ';
  @Input() formObj: FormProp[][] = [
    [new FormProp('Nombre Completo' ,'fullname', 'text'), new FormProp('Nombre de Usuario' ,'username', 'text')],
    [new FormProp('Correo Electronico' ,'email', 'text')],
    [new FormProp('Password' ,'password', 'password'), new FormProp('Confirmar Password' ,'Confirm Password', 'password')],
    [new FormProp('Aceptar los Terminos' ,'Accept Terms', 'radio', 'form-check-input', false)],
  ]


  continue: boolean = false;

  constructor(private cdref: ChangeDetectorRef){}
  
  
  ngOnInit(): void {
  }

  onContinue(cont:boolean){
    this.continue = cont
  }


  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  onSubmit(cont:boolean){
    if(!this.continue || !cont) return

    var tobj: any = {}
    this.formObj.flat(2).forEach( e => tobj[e.label as keyof typeof tobj]= e.value)
    this.formModel.emit(tobj)
  }

  onReset(form: NgForm): void {
    this.continue = false;
    form.reset();
  }

}
