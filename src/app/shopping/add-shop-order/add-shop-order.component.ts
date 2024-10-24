import { Component, ViewChild } from '@angular/core';
import { FormProp } from 'src/app/models/form-prop.model';
import { ShopRM } from 'src/app/models/shopping/shopRM.model';
import { Timestamp } from 'firebase/firestore'
import { FirestoreOperationService } from 'src/app/services/firestore-operation.service';
import { AuditService } from 'src/app/services/audit.service';
import { AuthService } from 'src/app/services/auth.service';
import { Material } from 'src/app/models/catalogue/material.model';
import { ProviderService } from 'src/app/services/provider.service';
import { Provider } from 'src/app/models/catalogue/provider.model';
import { InvRMService } from 'src/app/services/inv-rm.service';
import { InvRawMaterial } from 'src/app/models/inventory/invRawMaterial.model';
import { BehaviorSubject,Subscription,concat,from, merge, switchMap, take, tap } from 'rxjs';
import { FormComponent } from 'src/app/core/form/form.component';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-add-shop-order',
  templateUrl: './add-shop-order.component.html',
  styleUrls: ['./add-shop-order.component.css'],
  providers: [FirestoreOperationService, {provide: 'path', useValue: '/shopOrder'}]
})
export class AddShopOrderComponent {

  currentProvider?:Provider;
  currentMaterial?:Material
  
  providers:any[] = [];
  ShopRM: ShopRM = new ShopRM();
  formObj: FormProp[][];
  
  submitted = false;
  username?:string = 'anonimo'
  queryChange?:string
  query?:string

  currentProvider$ = new BehaviorSubject(this.currentProvider?.price);
  currentMaterial$ = new BehaviorSubject(this.currentMaterial?.name);
  createShopOrder$: Subscription = new Subscription
  requestedAmount$:Subscription =  new Subscription

  constructor(private auditService: AuditService, private fos: FirestoreOperationService, private auth: AuthService, private provider:ProviderService, private invrmService: InvRMService) { 
    this.auth.user$.subscribe((data => this.username = data?.displayName ?? 'anonimo'))

    this.formObj = [
      [new FormProp('Nombre del Material' ,'MatName', 'text').setReadOnly(true)],
      [new FormProp('Fecha Limite del Material' ,'orderDeadline', 'date',[this.limitAfterToday]), new FormProp('Fecha de Emision de Orden' ,'emissionDate', 'date')],
      [ 
        new FormProp('Cantidad Solicitada' ,'requestedAmount', 'number', [this.mustBePostive]),
        new FormProp('Costo del Pedido' ,'cost', 'number', [this.selectProvider]).setReadOnly(true), 
      ],
    ]
  }

  @ViewChild(FormComponent) set form(formC: FormComponent) {
    if(formC) {  
      this.currentMaterial$.subscribe(n => formC.f['MatName'].patchValue(n))

      
      this.requestedAmount$ = merge(this.currentProvider$,formC.f['requestedAmount'].valueChanges.pipe(
        tap(v => {
          console.log(v)
          formC.f['cost'].patchValue(this.currentProvider?.price && v ? this.currentProvider?.price * v: 0)
          formC.f['cost'].markAsTouched()          
        }),
      )).subscribe()
    }
 }

 
 limitAfterToday(control: AbstractControl){
  return new Date(control.value) >   new Date() || control.value == null ? null : { 'custom': 'La fecha de Limite del Pedido de material debe ser almenos 2 dias después del dia actual' } 
}

 mustBePostive(control: AbstractControl){
    return control.value > 0 || control.value == null ? null : { 'custom': 'debe ser positivo' } 
  }

  selectProvider(control: AbstractControl){
    return control.value != 0 || control.value == null ? null : { 'custom': 'no puede ser 0, seleccione un proveedor o solicite una cantidad de material' } 
  }

  round = (num:number) => Math.round(num*100) /100


  getSelectedProvider(){
    this.currentProvider$.next(this.currentProvider?.price)
  }

  async getSelectedElement(element:any){
    this.currentMaterial = element.element
    this.currentMaterial$.next(this.currentMaterial?.name)
    if(this.currentMaterial)
    this.providers = await this.provider.getProvidersByMaterial(this.currentMaterial.id)
  }

  submit(ShopRM: any){
    this.ShopRM = ShopRM;
    this.saveShopRM()
  }

  
  saveShopRM(): void {
    this.ShopRM.timestamp = Timestamp.fromDate(new Date());
    this.createShopOrder$ = from(this.fos.create<ShopRM>(this.ShopRM)).pipe(
      take(1), 
      switchMap( () => this.invrmService.getStock(this.currentMaterial?.id)),
      switchMap( (stock:any) => {
        stock.waiting =  (+stock.waiting) + (this.ShopRM.requestedAmount ?? 0);
        return merge(
          this.invrmService.update(stock.id, stock),
          this.auditService.create(InvRawMaterial.name, `Actualizacion Stock Material: ${this.currentMaterial?.name ?? 'unkown'}`, this.username, JSON.stringify(stock) ,JSON.stringify(stock)),
          this.auditService.create(ShopRM.name, `Crear Orden de Compra: ${this.ShopRM.name}`, this.username, JSON.stringify(this.ShopRM))
        )
      }
    ),
    tap({complete: () => this.submitted = true})
    ).subscribe()
  }


  ngOnDestroy(){
    this.createShopOrder$.unsubscribe()
  }

  newShopRM(): void {
    this.createShopOrder$.unsubscribe()
    this.submitted = false;
    this.ShopRM = new ShopRM();
  }

}
