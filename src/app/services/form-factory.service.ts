import { Injectable } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { FormProp } from '../models/form-prop.model';

type makeFormObject<Type> = {
  readonly [Property in  keyof Type]-?: FormControl<Type[Property]>
}


@Injectable({
  providedIn: 'root'
})
export class FormFactoryService {

  constructor(private fb: NonNullableFormBuilder) { }



  // newFormObject<S>(props:FormProp[]): FormGroup<makeFormObject<S>>{

  //   props.reduce((o, k)=>{
  //     o[k.label] =  
  //   });

  //   return this.fb.group({
  //     email:  ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
  //     age: [0, [Validators.required]],
  //     doubleAge: [{value: 0, disabled: true}, [Validators.required]]
  //  }, {updateOn:'blur'})
  // }


}
