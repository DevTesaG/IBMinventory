import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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
    this.initPlaceHolder()
  }

  onContinue(cont:boolean){
    this.continue = cont
  }

  initPlaceHolder(){
    if(this.placeHolder){
      this.formObj.forEach((hor)=> hor.forEach(f=> {
        if(this.placeHolder){
          var val:any = this.placeHolder[f.getLabel() as keyof Object] 
          if(val instanceof Timestamp){
            val =  this.formatDateString( val.toDate().toLocaleDateString())
          }
          f.setValue(val)
        } 
      
      }))
    }
  }

  ngOnChanges(): void {
    this.initPlaceHolder()
  }


  formatDateString(date: string){
    return date.split('/').reverse().join('/').replace(/\//g,'-',)
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
    this.reject.emit()
  }

}
