import { Component, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/catalogue/product.model';
import { Timestamp } from 'firebase/firestore'
import { AuditService } from 'src/app/services/audit.service';
import { FirestoreOperationService } from 'src/app/services/firestore-operation.service';
import { FormProp } from 'src/app/models/form-prop.model';
import { InvFPService } from 'src/app/services/inv-fp.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormComponent } from 'src/app/core/form/form.component';
import { Subscription, tap } from 'rxjs';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [FirestoreOperationService, {provide: 'path', useValue: '/products'}]
})
export class AddProductComponent{

  product: Product = new Product();
  formObj: FormProp[][];
  submitted = false;
  username?:string = 'anonimo'
  userRole?:string;
  onLeadTime$:Subscription = new Subscription;

  constructor(private invFpService: InvFPService, private auditService: AuditService, private fos: FirestoreOperationService, private auth: AuthService) { 
    this.auth.user$.subscribe((data => {this.username = data?.displayName; this.userRole=data?.userRole }))

    this.formObj = [
      [new FormProp('Nombre' ,'name', 'text')],
      [new FormProp('Descripcion' ,'description', 'text')],
      [new FormProp('Precio' ,'price', 'number', [this.custom]),new FormProp('Divisa' ,'currency', 'select', [], ['MXN', 'USD']), new FormProp('Tiempo de Fabricacion' ,'leadTime', 'number'),],
      [new FormProp('Se puede Vender' ,'sellable', 'select', [], ['SI', 'NO']), new FormProp('Tipo' ,'type', 'text'), new FormProp('Unidad de medida' ,'units', 'text')],
    ]
  }

  @ViewChild(FormComponent) formC!:FormComponent;

  ngAfterViewInit() {
    this.onLeadTime$ = this.formC.f['capacityByTurn'].valueChanges.pipe(
      tap(v => this.formC.f['leadTime'].patchValue(this.round(1/v)))
    ).subscribe()
  }
  
  round = (num:number) => Math.round(num*100) /100

  custom(control: AbstractControl){
    return control.value > 0 || control.value == null ? null : { 'custom': 'debe ser positivo' } 
  }


  submit(product: any){
    this.product = product
    this.saveProduct()
  }

  saveProduct(): void {
    this.product.timestamp = Timestamp.fromDate(new Date());
    var {stock, ...p} = this.product
    
    
    this.invFpService.create({available: +(stock ?? 0), name:p.name, commited: 0, waiting: 0, timestamp: Timestamp.fromDate(new Date())}).then((inv:any) => {
        this.fos.create(p, inv.id);
         this.submitted = true;
    });
  }


  onNgDestory(){
    this.onLeadTime$.unsubscribe()
  }

  newProduct(): void {
    this.submitted = false;
    this.product = new Product();
  }
}
