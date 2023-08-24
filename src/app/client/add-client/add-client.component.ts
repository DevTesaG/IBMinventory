import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/catalogue/client.model';
import { FormProp } from 'src/app/models/form-prop.model';
import { AuditService } from 'src/app/services/audit.service';
import { AuthService } from 'src/app/services/auth.service';
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
  username?:string = 'Anonimo';
  constructor(private auth: AuthService, private auditService: AuditService, private fos: FirestoreOperationService) { 
    this.auth.user$.subscribe((data => this.username = data?.displayName))

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
    this.fos.create<Client>(this.client).then((client:Client) => {
      console.log('Created new Client successfully!');
      this.auditService.create('Crear', `Cliente ${client.name}`, this.username, JSON.stringify(client))
      this.submitted = true;
    });
  }

  newClient(): void {
    this.submitted = false;
    this.client = new Client();
  }

}
