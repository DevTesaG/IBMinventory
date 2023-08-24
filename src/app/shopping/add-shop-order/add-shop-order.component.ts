import { Component, OnInit } from '@angular/core';
import { FormProp } from 'src/app/models/form-prop.model';
import { ShopRM } from 'src/app/models/shopping/shopRM.model';
import { Timestamp } from 'firebase/firestore'
import { FirestoreOperationService } from 'src/app/services/firestore-operation.service';
import { AuditService } from 'src/app/services/audit.service';

@Component({
  selector: 'app-add-shop-order',
  templateUrl: './add-shop-order.component.html',
  styleUrls: ['./add-shop-order.component.css'],
  providers: [FirestoreOperationService, {provide: 'path', useValue: '/shopOrder'}]
})
export class AddShopOrderComponent {


  ShopRM: ShopRM = new ShopRM();
  formObj: FormProp[][];
  submitted = false;
  
  
  constructor(private auditService: AuditService, private fos: FirestoreOperationService) { 
    this.formObj = [
      [new FormProp('Nombre del Material' ,'name', 'text')],
      [new FormProp('Fecha Limite del Material' ,'orderDeadline', 'date'), new FormProp('Fecha de Emision de Orden' ,'emissionDate', 'date')],
      [ 
        new FormProp('Cantidad Solicitada' ,'requiredMaterial', 'number'),
        new FormProp('Costo del Pedido' ,'cost', 'number'), 
      ],
    ]
  }
  
  round = (num:number) => Math.round(num*100) /100






  submit(ShopRM: any){
    this.ShopRM = ShopRM;
    this.saveShopRM()
  }

  
  saveShopRM(): void {
    this.ShopRM.timestamp = Timestamp.fromDate(new Date());
    this.fos.create<ShopRM>(this.ShopRM).then(() => {
    //   this.auditService.create(ShopRMService.name, 'Crear ShopRMo', 'Jonny123')
      this.submitted = true;
    });
  }

  newShopRM(): void {
    this.submitted = false;
    this.ShopRM = new ShopRM();
  }

}
