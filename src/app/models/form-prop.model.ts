import { FormControl, ValidatorFn, Validators } from "@angular/forms"
import { tap } from "rxjs";

export class FormProp {

    value: any
    label:any
    type:any
    control?:FormControl;
    readonly?:boolean
    classlist: any
    placeholder: any
    ref?: any[]
    valueCallback:any
    respondTo$:any

    constructor(placeholder?:any, label?:any, type?:any, validators:ValidatorFn[] = [Validators.required], value?:any, classlist?:any,valueCallback?:any ,ref?:any[], readonly:boolean=false){
        this.value = value
        this.label = label
        this.type = type
        this.placeholder = placeholder
        this.classlist = classlist ? classlist: ' '
        this.ref = ref ? ref: undefined
        this.valueCallback = valueCallback
        this.readonly = readonly
        
        validators.push(Validators.required);
        this.control = new FormControl({value: null, disabled: readonly},validators)
        this.respondTo$ = this.control.valueChanges.pipe(
            tap({next: valueCallback,error: e => console.log(e), complete: ()=> console.log('Completed')})
        )
    }

    setReadOnly(readonly:boolean){
        this.readonly = readonly
        return this
    }

    setValue(value:any){
        this.value = value
        return this
    }

    getValue(): any {
        if(this.ref){
            
            this.value = this.valueCallback(...this.ref.map(e=>e.value))
        }else{
            this.value = this.valueCallback()
        }
    };

    getLabel(){
        return this.label
    }
}
