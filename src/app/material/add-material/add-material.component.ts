import { Component } from '@angular/core';
import { Material } from 'src/app/models/catalogue/material.model';
import { MaterialService } from 'src/app/services/material.service';
import { Timestamp } from 'firebase/firestore'
import { AuditService } from 'src/app/services/audit.service';
import { FirestoreOperationService } from 'src/app/services/firestore-operation.service';
import { FormProp } from 'src/app/models/form-prop.model';
import { InvRMService } from 'src/app/services/inv-rm.service';
import { InvRawMaterial } from 'src/app/models/inventory/invRawMaterial.model';
import { ProviderService } from 'src/app/services/provider.service';
import { Provider } from 'src/app/models/catalogue/provider.model';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css'],
  providers: [FirestoreOperationService, {provide: 'path', useValue: '/materials'}]
})
export class AddMaterialComponent {

  material: Material = new Material();
  invMaterial: InvRawMaterial = new InvRawMaterial()
  provider: Provider = new Provider()

  formObj: FormProp[][];
  submitted = false;
  username?:string = 'anonimo'
  userRole?:string;

  Deps = [
    'Corte y Ensamble',
    "Carpinteria",
    "Detallado y Pintura",
    "Piel",
    "Consumible",
    "Almacen General",
    "Empaque"
  ]

  constructor(private fos: FirestoreOperationService ,private auditService: AuditService, private invRMService: InvRMService, private providerService: ProviderService, private auth: AuthService) { 
    this.auth.user$.subscribe((data => {this.username = data?.displayName; this.userRole=data?.userRole }))

    this.formObj = [
      [new FormProp('Nombre' ,'name', 'text'),new FormProp('Cantidad en Inventario' ,'available', 'number', [this.entero])],
      [new FormProp('Descripcion' ,'description', 'text')],
      [new FormProp('Nombre del Proveedor' ,'providerName', 'text'), new FormProp('Precio' ,'price', 'number',[this.positivo])],
      [new FormProp('Lote Minimo' ,'minBatch', 'number', [this.entero]), new FormProp('Tiempo de Entrega', 'deliveryTime', 'number', [this.entero])],
      [new FormProp('Area', 'area', 'select', [], 
      ['corte y ensamble',"carpinteria","detallado y pintura","piel","almacen General","empaque"]),new FormProp('Zona', 'zone', 'text'), new FormProp('Posicion', 'position', 'text') ]
    ] 
    
  }


  
  positivo(control: AbstractControl){
    return +(control.value) > 0  ||  !(!!control.value) ? null : { 'custom': 'debe ser positivo' } 
  }

  entero(control: AbstractControl){
    return (+(control.value) > 0 && Number.isInteger(+(control.value))) ||  !(!!control.value) ? null : { 'custom': 'debe ser positivo y entero' } 
  }


  
  submit(material: any){
    this.material ={
      name: material.name,
      description: material.description,
      area: material.area,
      zone: material.zone,
      position: material.position,
    }
    this.invMaterial = {
      name: material.name,
      available: +(material.available),
      commited: 0,
      watingCommited: 0,
      wating: 0,
    }
    this.provider = {
      price: material.price,
      name: material.providerName,
      deliveryTime: material.deliveryTime,
      minBatch: material.minBatch
    }
    
    this.saveMaterial()
  }

  

  saveMaterial(): void {
    this.material.timestamp = Timestamp.fromDate(new Date());
    this.invMaterial.timestamp = Timestamp.fromDate(new Date());

    this.fos.create<Material>(this.material).then((mat:any) => {
      this.invRMService.create(this.invMaterial, mat.id)
      this.providerService.create({materialId: mat.id, ...this.provider})
      this.auditService.create(MaterialService.name, `Crear Material ${this.material.name}`, this.username, JSON.stringify(this.invMaterial))
      this.submitted = true;
    });
  }

  newMaterial(): void {
    this.submitted = false;
    this.material = new Material();
  }
}
5