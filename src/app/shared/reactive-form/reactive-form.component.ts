import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl,FormControl, FormGroup, NonNullableFormBuilder} from '@angular/forms';
import { FormProp } from 'src/app/models/form-prop.model';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormComponent implements OnInit {

  constructor(private fb: NonNullableFormBuilder) { }

  submitted = false
  
  @Input('Form') formArray!:FormProp[][];

  _form!:any;
  
  get f(): { [key: string]: AbstractControl } {
    return this._form.controls;
  }

  ngOnInit(): void { 
    
    var f = {}
    f = this.formArray.flat().reduce((form:any, f:FormProp) => {
      form[f.label] = f.control
      return form;
    }, f)

    this._form = this.fb.group(f);
  }

  onReset():void{
    this.submitted = false;
    this._form.reset();
  }

  onSubmit(): void {
    if (this._form.invalid) {
      return;
    }

    console.log(JSON.stringify(this._form.getRawValue(), null, 2));
  }

}
