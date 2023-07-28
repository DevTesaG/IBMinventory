import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/catalogue/product.model';
import { ProductService } from 'src/app/services/product.service';
import { Timestamp } from 'firebase/firestore'
import { AuditService } from 'src/app/services/audit.service';
import { FirestoreOperationService } from 'src/app/services/firestore-operation.service';
import { FormProp } from 'src/app/models/form-prop.model';

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
  
  
  constructor(private ProductService: ProductService, private auditService: AuditService, private fos: FirestoreOperationService) { 

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
    this.fos.create<Product>(this.product).then(() => {
    //   this.auditService.create(ProductService.name, 'Crear Producto', 'Jonny123')
      this.submitted = true;
    });
  }

  newProduct(): void {
    this.submitted = false;
    this.product = new Product();
  }

}
