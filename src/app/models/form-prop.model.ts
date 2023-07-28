export class FormProp {

    value: any
    label:any
    type:any
    classlist: any
    placeholder: any
    ref?: any[]
    valueCallback:any


    constructor2(params: Partial<FormProp>) {
        Object.assign(this, params)
    }

    constructor(placeholder?:any, label?:any, type?:any, classlist?:any,valueCallback?:any ,ref?:any[], value?:any){
        this.value = value
        this.label = label
        this.type = type
        this.placeholder = placeholder
        this.classlist = classlist ? classlist: ' '
        this.ref = ref ? ref: undefined
        this.valueCallback = valueCallback
    }

    getValue(): any {
        if(this.ref){
            
            this.value = this.valueCallback(...this.ref.map(e=>e.value))
        }else{
            this.value = this.valueCallback()
        }
    };
}
