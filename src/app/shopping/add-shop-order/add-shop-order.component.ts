import { Component } from '@angular/core';
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
  
  constructor(private auditService: AuditService, private fos: FirestoreOperationService, private auth: AuthService, private provider:ProviderService, private invrmService: InvRMService) { 
    this.auth.user$.subscribe((data => this.username = data?.displayName))
    const q = new FormProp('Cantidad Solicitada' ,'requestedAmount', 'number')
    this.formObj = [
      [new FormProp('Nombre del Material' ,'MatName', 'text', '', ()=>this.currentMaterial?.name).setReadOnly(true)],
      [new FormProp('Fecha Limite del Material' ,'orderDeadline', 'date'), new FormProp('Fecha de Emision de Orden' ,'emissionDate', 'date')],
      [ 
        q,
        new FormProp('Costo del Pedido' ,'cost', 'number', '', (q:any)=> this.currentProvider?.price && q ? this.currentProvider?.price * q: 0, [q]), 
      ],
    ]
  }
  
  round = (num:number) => Math.round(num*100) /100


  async getSelectedElement(element:any){
    this.currentMaterial = element.element
    if(this.currentMaterial)
    this.providers = await this.provider.getProvidersByMaterial(this.currentMaterial.id)
  }

  submit(ShopRM: any){
    this.ShopRM = ShopRM;
    this.saveShopRM()
  }

  
  saveShopRM(): void {
    this.ShopRM.timestamp = Timestamp.fromDate(new Date());
    this.fos.create<ShopRM>(this.ShopRM).then(async () => {
      var {wating, ...stock} = await this.invrmService.getStock(this.currentMaterial?.id)
      if(wating && this.ShopRM.requestedAmount && this.currentMaterial){
        var newStock = {wating: wating + this.ShopRM.requestedAmount, ...stock}
        this.invrmService.update(stock.id, newStock)
        this.auditService.create(InvRawMaterial.name, `Actualizacion Stock Material: ${this.currentMaterial.name}`, this.username, JSON.stringify(newStock) ,JSON.stringify(stock))
      }
      this.auditService.create(ShopRM.name, `Crear Orden de Compra: ${this.ShopRM.name}`, this.username, JSON.stringify(this.ShopRM))
      this.submitted = true;
    });
  }

  newShopRM(): void {
    this.submitted = false;
    this.ShopRM = new ShopRM();
  }

}
