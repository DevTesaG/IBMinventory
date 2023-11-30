import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/models/catalogue/provider.model';
import { FormProp } from 'src/app/models/form-prop.model';
import { AuditService } from 'src/app/services/audit.service';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreOperationService } from 'src/app/services/firestore-operation.service';

@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.css'],
  providers: [FirestoreOperationService, {provide: 'path', useValue: '/providers'}]

})
export class AddProviderComponent implements OnInit {

  provider: Provider = new Provider()
  formObj: FormProp[][];
  submitted = false;
  username?:string = 'anonimo'
  userRole?:string;

  constructor(private fos: FirestoreOperationService, private auth:AuthService, private audit: AuditService) {
    this.auth.user$.subscribe((data => {this.username = data?.displayName; this.userRole=data?.userRole }))
    this.formObj = [
      [new FormProp('Nombre del Proovedor' ,'providerName', 'text'), new FormProp('Precio' ,'price', 'number')],
      [new FormProp('Lote Minimo' ,'minBatch', 'number'), new FormProp('Tiempo de Entrega', 'deliveryTime', 'number')],      
    ] 
   }

     
  submit(provider: any){
    this.provider = provider
    this.saveProvider()
  }

  
  saveProvider(): void {
    if(!history.state.id) return
    this.provider.id = history.state.id
    this.provider.materialId = history.state.id
      this.fos.create<Provider>(this.provider).then(() => {
      this.audit.create(Provider.name, `Crear Provedor ${this.provider.name}`, this.username, JSON.stringify(this.provider))

      alert('Proveedor creado correctamente!');
      this.submitted = true;
    });
  }

  newProvider(): void {
    this.submitted = false;
    this.provider = new Provider();
  }

  ngOnInit(): void {

  }

}
