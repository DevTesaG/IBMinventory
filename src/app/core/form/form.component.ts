import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, NgForm, NonNullableFormBuilder } from '@angular/forms';
import { FormProp } from 'src/app/models/form-prop.model';
import { Timestamp } from 'firebase/firestore'




@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  @Output() formModel: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() reject: EventEmitter<Object> = new EventEmitter<Object>();

  @Input() placeHolder?: Object;
  @Input() mode?: boolean = false;
  @Input() showBtns?: boolean = true;
  @Input() btnMes?: string = 'Registrar';
  @Input() modalMessage?: string = '¿ Desea continuar con este proceso ? ';
  @Input() formObj: FormProp[][] = [
    [new FormProp('Nombre Completo' ,'fullname', 'text'), new FormProp('Nombre de Usuario' ,'username', 'text')],
    [new FormProp('Correo Electronico' ,'email', 'text')],
    [new FormProp('Password' ,'password', 'password'), new FormProp('Confirmar Password' ,'Confirm Password', 'password')],
    [new FormProp('Aceptar los Terminos' ,'Accept Terms', 'radio', [], 'form-check-input', false)],
  ]

  _form!:any;
  continue: boolean = false;
  submitted: boolean = false;
  firstCall:boolean = true;

  constructor(private cdref: ChangeDetectorRef, private fb: NonNullableFormBuilder){

  }
  
  
  ngOnInit(): void {
    var f = {}
    f = this.formObj.flat().reduce((form:any, f:FormProp) => {
      if(this.placeHolder){
        var val:any = this.placeHolder[f.getLabel() as keyof Object] 
        if(val instanceof Timestamp){
          val =  this.formatDateString(val.toDate())
        }
        f.control?.patchValue(val);
      } 
      if(this.mode){ f.control?.clearValidators();}
      form[f.label] = f.control
      return form;
    }, f)

    this._form = this.fb.group(f);
  }

  get f(): { [key: string]: AbstractControl } {
    return this._form.controls;
  }

  onContinue(cont:boolean){
    this.continue = cont
  }

  initPlaceHolder(){
    if(this.placeHolder){
      this.formObj.forEach((hor)=> hor.forEach(form=> {
        if(this.placeHolder){
          var val:any = this.placeHolder[form.getLabel() as keyof Object] 
          if(val instanceof Timestamp){
            val =  this.formatDateString(val.toDate())
          }
          this.f[form.getLabel()].patchValue(val);
        } 
      
      }))
    }
  }

  ngOnChanges(): void {
    if(!this.firstCall){
      this.initPlaceHolder()
    }
    this.firstCall = false;
  }


  formatDateString(date: Date){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  } 

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  onSubmit(cont:any){
    this.submitted = true
    if (this._form.invalid) {
      return;
    }
    this.formModel.emit(this._form.getRawValue())
  }

  onReset(): void {
    this._form.reset();
    this.continue = false;
    this.submitted = false
    // var labels = this.formObj;
    // labels = labels.flat(2).filter(e=> !(e.readonly)).map( e => e.label) 
    // labels.forEach((l:any) => form.controls[l].reset())
  }

}
