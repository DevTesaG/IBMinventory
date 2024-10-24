import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { Material } from 'src/app/models/catalogue/material.model';
import { Provider } from 'src/app/models/catalogue/provider.model';
import { FormProp } from 'src/app/models/form-prop.model';
import { AuditService } from 'src/app/services/audit.service';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreOperationService } from 'src/app/services/firestore-operation.service';

@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.css'],
  providers: [FirestoreOperationService, {provide: 'path', useValue: '/materials'}]

})
export class AddProviderComponent implements OnInit {



  provider: Provider = new Provider()
  providerIndex: number = -1
  matProviders:any[] = []
  formObj: FormProp[][];
  submitted = false;
  username?:string = 'anonimo'
  userRole?:string;
  

  constructor(private fos: FirestoreOperationService, private auth:AuthService, private audit: AuditService) {
    this.auth.user$.subscribe((data => {this.username = data?.displayName; this.userRole=data?.userRole }))
    this.formObj = [
      [new FormProp('Nombre Comercial Proveedor' ,'name', 'text', undefined, undefined, undefined, undefined, undefined, true)],
      [new FormProp('Lote Minimo' ,'minBatch', 'number'), new FormProp('Tiempo de Entrega', 'deliveryTime', 'number'), new FormProp('Precio' ,'price', 'number')],      
    ] 
   }

     
  submit(provider: any){
    if(this.providerIndex == -1){
      this.matProviders?.push({id: this.provider.id, ...provider})
    }else{
      this.matProviders[this.providerIndex] = {id: this.provider.id, ...provider}
    }
    this.saveProvider()
  }

  getSelectedProvider(element:any){
    this.providerIndex = this.matProviders?.findIndex(p => p.id == element.element.id)
    this.provider = this.providerIndex !=-1 ? this.matProviders[this.providerIndex]:element.element
    this.provider.name = element.element.name
  }


  deleteProvider(){
    this.matProviders.splice(this.providerIndex)
    this.saveProvider()
  }
  
  saveProvider(): void {
    if(!history.state.id) return

    this.fos.update(history.state.id, {providers: this.matProviders}).pipe(
      tap({
        next: ()=>{
      alert('Proveedor creado correctamente!');
      this.submitted = true;
      }}));

      alert('Proveedor actualizado correctamente!');
      this.provider = new Provider()
      this.providerIndex = -1
  }

  newProvider(): void {
    this.submitted = false;
    this.provider = new Provider();
  }

  ngOnInit(): void {
    console.log(history.state.id, history.state.providers)
    this.matProviders =  history.state.providers
  }

}
