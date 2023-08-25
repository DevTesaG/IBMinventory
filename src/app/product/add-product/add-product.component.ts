import { Component } from '@angular/core';
import { Product } from 'src/app/models/catalogue/product.model';
import { Timestamp } from 'firebase/firestore'
import { AuditService } from 'src/app/services/audit.service';
import { FirestoreOperationService } from 'src/app/services/firestore-operation.service';
import { FormProp } from 'src/app/models/form-prop.model';
import { InvFPService } from 'src/app/services/inv-fp.service';
import { AuthService } from 'src/app/services/auth.service';

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
  
  constructor(private invFpService: InvFPService, private auditService: AuditService, private fos: FirestoreOperationService, private auth: AuthService) { 
    this.auth.user$.subscribe((data => this.username = data?.displayName))

    var cap:FormProp = new FormProp('Capacidad por turno' ,'capacityByTurn', 'number')

    this.formObj = [
      [new FormProp('Nombre' ,'name', 'text'), new FormProp('Codigo' ,'code', 'text')],
      [new FormProp('Descripcion' ,'description', 'text')],
      [new FormProp('Precio' ,'price', 'number')],
      [new FormProp('Cantidad en Inventario' ,'stock', 'number')],
      [cap, new FormProp('Tiempo de Produccion', 'leadTime', 'number', '', (value:any) => value ? this.round(1/value) : 0, [cap], 0)] ,
    ]
  }
  
  round = (num:number) => Math.round(num*100) /100

  submit(product: any){
    this.product = product;
    this.saveProduct()
  }

  
  saveProduct(): void {
    this.product.timestamp = Timestamp.fromDate(new Date());
    this.fos.create<Product>(this.product).then((prod:any) => {

      this.invFpService.create({available: this.product.stock, commited: 0, wating: 0}).then((inv:any) => {
        this.fos.update(prod.id, {invId: inv.id})
        this.auditService.create(Product.name, `Crear Producto: ${this.product.name}`, this.username, JSON.stringify(this.product))
      })
      this.submitted = true;
    });
  }

  newProduct(): void {
    this.submitted = false;
    this.product = new Product();
  }

}
