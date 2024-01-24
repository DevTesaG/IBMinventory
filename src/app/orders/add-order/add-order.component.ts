import { Component, ViewChild} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import {BehaviorSubject, Subscription, tap } from 'rxjs';
import { FormComponent } from 'src/app/core/form/form.component';
import { FormProp } from 'src/app/models/form-prop.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersBuisnessService } from 'src/app/services/orders-buisness.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent{

  order;
  submitted = false;
  formObj: FormProp[][];


  q = '';
  queryChange?:string = undefined;
  
  orderProducts:any[] = []
  reqMaterials:any[] = []
  materials:any[] = []
  username?:string;
  
  clientName:string = ''
  
  clientName$ = new BehaviorSubject(this.clientName)
  create$: Subscription = new Subscription;

  constructor(private router: Router, private auth: AuthService, public orderBusiness:OrdersBuisnessService) { 
    
    console.log(this.orderBusiness.order)
    if(Object.keys(this.orderBusiness.order).length == 0) this.router.navigate(['/orders/add'])

    this.order = this.orderBusiness.order

    console.log(this.order, this.orderBusiness.order)

    this.formObj = [
      [new FormProp('Numero de Orden de Pedido' ,'name', 'text')],
      [new FormProp('Nombre del Client' ,'clientName', 'text')],
      [new FormProp('Fecha de Embarque' ,'shipDate', 'date')],
      [
        new FormProp('Dias de Produccion' ,'productionDays', 'number'), 
        new FormProp('Pedido de Insumos' ,'orderInput', 'number')
      ],
      [
        new FormProp('Pedido Materia Prima' ,'rmOrderDeadline', 'date',[this.custom]), 
        new FormProp('Limite inicio de Produccion' ,'startProductionDeadline', 'date')
      ],
    ]
  }


  @ViewChild(FormComponent) formC!:FormComponent;

  ngAfterViewInit() {

    
    this.clientName$.subscribe(v => this.formC.f['clientName'].patchValue(v))

    var prod = this.getProductionDays();
    this.formC.f['productionDays'].patchValue(prod);
    this.formC.f['productionDays'].markAsTouched();
    this.formC.f['orderInput'].patchValue(this.order.orderWaitMaxTime);
    this.formC.f['orderInput'].markAsTouched();

    var a = this.formC.f['shipDate'].valueChanges.pipe(
      tap(v => {
        this.formC.f['rmOrderDeadline'].patchValue(this.getRmOrderDeadline(v, prod, this.order.orderWaitMaxTime))
        this.formC.f['rmOrderDeadline'].markAsTouched()
        this.formC.f['startProductionDeadline'].patchValue(this.getStartProductionDeadline(v, prod, this.order.orderWaitMaxTime))
        this.formC.f['startProductionDeadline'].markAsTouched()
      })
    ).subscribe()
  }

  ngOnInit(): void {
  }

  filterProducts(): void {
    this.queryChange = this.q
  }

  getSelectedElement(element: any){
    if(this.order){
      this.clientName = element.element.name
      this.clientName$.next(this.clientName)
      this.orderBusiness.order.clientId = element.element.id
    }
  }

  getClientName = () => this.clientName

  getProductionDays = () => Math.ceil(this.orderBusiness.orderProducts.map((e:any) => e.leadTime * e.quantity).reduce((sum:number, element:number) => sum + element, 0))
  getOrderInput = () => this.order.orderWaitMaxTime
  
  getRmOrderDeadline = (shipDate: string, prodDays:number, inputDays:number) => {     
    if(!(shipDate && prodDays && inputDays )) return

    const rm = new Date(shipDate);
    rm.setDate(new Date(shipDate).getDate() - inputDays - prodDays)
    
    // return this.formatDateString( rm.toLocaleDateString())
    return  rm.toLocaleDateString()
  }

  getStartProductionDeadline = (shipDate: string, prodDays:number, inputDays:number) => {
    if(!(shipDate && prodDays && inputDays )) return
    
    const pd = new Date(shipDate)
    pd.setDate(new Date(shipDate).getDate() - prodDays)
  
    return pd.toLocaleDateString()  
    // return this.formatDateString(pd.toLocaleDateString())  
  }

  custom(control: AbstractControl){
    return new Date(control.value) >   new Date() || control.value == null ? null : { 'custom': 'La fecha de Limite del Pedido de material debe ser almenos 2 dias después del dia actual' } 
  }

  submit(order: any){
     this.orderBusiness.order = order;
    console.log(this.orderBusiness.order)
    this.create$ = this.orderBusiness.editProducts().subscribe() 
  }

  ngOnDestroy(){
    this.create$.unsubscribe()
  }

  // formatDateString(date: string){
  //   return date.split('/').reverse().join('/').replace(/\//g,'-',)
  // } 



}
