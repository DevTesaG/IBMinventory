import { Component, OnInit} from '@angular/core';
import { Provider } from 'src/app/models/catalogue/provider.model';
import { FormProp } from 'src/app/models/form-prop.model';
import { AuditService } from 'src/app/services/audit.service';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreOperationService } from 'src/app/services/firestore-operation.service';

@Component({
  selector: 'app-providers-list',
  templateUrl: './providers-list.component.html',
  styleUrls: ['./providers-list.component.css'],
  providers: [FirestoreOperationService, {provide: 'path', useValue: '/providers'}]
})
export class ProvidersListComponent implements OnInit {
  provider?: Provider =undefined
  queryChange?:string
  formObj: FormProp[][];
  submitted = false;
  username?:string = 'anonimo'
  userRole?:string = 'a';

  
  
  constructor(private fos: FirestoreOperationService, private auth:AuthService, private audit: AuditService) {
    // this.auth.user$.subscribe((data => {this.username = data?.displayName; this.userRole=data?.userRole }))
    this.formObj = [
      [new FormProp('Nombre Comercial Proveedor' ,'name', 'text'), new FormProp('Categoria' ,'category', 'text'),],
      [new FormProp('Razon Social' ,'socialReason', 'text'), new FormProp('RFC', 'rfc', 'text'), new FormProp('Telefonos' ,'phone', 'text')],      
      [new FormProp('Banco' ,'bank', 'text'), new FormProp('Cuenta', 'rfc', 'text')],      
      [new FormProp('Dias de credito' ,'creditDays', 'number'), new FormProp('Monto credito', 'creditAmount', 'number'), new FormProp('Email' ,'email', 'email')],      
      [new FormProp('Direccion' ,'address', 'text')],      
    ] 
   }

     
  submit(provider: any){
    if(this.provider){
      this.updateProvider(provider)
    }else{
      this.saveProvider(provider)
    }
  }



  getSelectedElement(provider:any){
    this.provider = provider.element
  }
  
  updateProvider(provider:Provider):void{
    this.fos.update(this.provider?.id, provider)
    alert('Proveedor actualizado correctamente!');
    this.submitted = true;
    this.provider = undefined
  }

  saveProvider(provider:Provider): void {
      this.fos.create<Provider>(provider).then(() => {
      // this.audit.create(Provider.name, `Crear Provedor ${this.provider.name}`, this.username, JSON.stringify(this.provider))

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
