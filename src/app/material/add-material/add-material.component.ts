import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/models/catalogue/material.model';
import { MaterialService } from 'src/app/services/material.service';
import { Timestamp } from 'firebase/firestore'
import { Departments } from 'src/app/models/enums/departments.model';
import { AuditService } from 'src/app/services/audit.service';
import { FirestoreOperationService } from 'src/app/services/firestore-operation.service';
import { FormProp } from 'src/app/models/form-prop.model';
import { InvRMService } from 'src/app/services/inv-rm.service';
import { InvRawMaterial } from 'src/app/models/inventory/invRawMaterial.model';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css'],
  providers: [FirestoreOperationService, {provide: 'path', useValue: '/materials'}]
})
export class AddMaterialComponent {

  material: Material = new Material();
  invMaterial: InvRawMaterial = new InvRawMaterial()

  formObj: FormProp[][];
  submitted = false;

  Deps = [
    'Corte y Ensamble',
    "Carpinteria",
    "Detallado y Pintura",
    "Piel",
    "Consumible",
    "Almacen General",
    "Empaque"
  ]

  constructor(private fos: FirestoreOperationService ,private auditService: AuditService, private invRMService: InvRMService) { 
    this.formObj = [
      [new FormProp('Nombre' ,'name', 'text'), new FormProp('Lote Minimo' ,'minBatch', 'number')],
      [new FormProp('Descripcion' ,'description', 'text')],
      [new FormProp('Precio' ,'price', 'number')],
      [new FormProp('Cantidad en Inventario' ,'available', 'number')],
      [new FormProp('Tiempo de Entrega', 'deliveryTime', 'number')] ,
      [new FormProp('Area', 'area', 'text'),new FormProp('Zona', 'zone', 'text'), new FormProp('Posicion', 'position', 'text') ]
    ] 
    
  }

  
  submit(material: any){
    this.material = material;
    this.invMaterial = {
      name: material.name,
      available: +material.available,
      commited: 0,
      watingCommited: 0,
      wating: 0
    }
    this.saveMaterial()
  }

  

  saveMaterial(): void {
    this.material.timestamp = Timestamp.fromDate(new Date());

    this.fos.create<Material>(this.material).then((mat:any) => {
      this.invRMService.create({materialId: mat.id,...this.invMaterial})
      console.log('Created new material successfully!');
        // this.auditService.create(MaterialService.name, 'Crear Orden', 'Jonny123')
        this.submitted = true;
    });
  }

  newMaterial(): void {
    this.submitted = false;
    this.material = new Material();
  }
}
