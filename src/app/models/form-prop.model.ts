export class FormProp {

    value: any
    label:any
    type:any
    readonly?:boolean
    classlist: any
    placeholder: any
    ref?: any[]
    valueCallback:any


    constructor2(params: Partial<FormProp>) {
        Object.assign(this, params)
    }

    constructor(placeholder?:any, label?:any, type?:any, classlist?:any,valueCallback?:any ,ref?:any[], value?:any, readonly?:boolean){
        this.value = value
        this.label = label
        this.type = type
        this.placeholder = placeholder
        this.classlist = classlist ? classlist: ' '
        this.ref = ref ? ref: undefined
        this.valueCallback = valueCallback
        this.readonly = readonly
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
