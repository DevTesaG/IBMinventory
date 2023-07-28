import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/catalogue/client.model';
import { Material } from 'src/app/models/catalogue/material.model';
import { FormProp } from 'src/app/models/form-prop.model';
import { AuditService } from 'src/app/services/audit.service';
import { ClientService } from 'src/app/services/client.service';
import { FirestoreOperationService } from 'src/app/services/firestore-operation.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
  providers: [FirestoreOperationService, {provide: 'path', useValue: '/clients'}]
})
export class AddClientComponent {

  
  client: Client = new Client();
  formObj: FormProp[][];
  submitted = false;

  constructor(private ClientService: ClientService, private auditService: AuditService, private fos: FirestoreOperationService) { 
   
    this.formObj = [
      [new FormProp('Nombre' ,'name', 'text'), new FormProp('Numero de Cliente' ,'code', 'text')],
      [new FormProp('Direccion' ,'address', 'text')],
      [new FormProp('Telefono' ,'phone', 'number')],
    ]
  }

  

  submit(client: any){
    this.client = client;
    this.saveClient()
  }

  saveClient(): void {
    this.fos.create<Material>(this.client).then(() => {
      console.log('Created new Client successfully!');
      this.auditService.create(ClientService.name, 'Crear Cliente', 'Jonny123')
      this.submitted = true;
    });
  }

  newClient(): void {
    this.submitted = false;
    this.client = new Client();
  }

}
