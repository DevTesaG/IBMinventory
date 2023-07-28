import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Timestamp } from 'firebase/firestore'
import { map } from 'rxjs';
import { Product } from 'src/app/models/catalogue/product.model';
import { FormProp } from 'src/app/models/form-prop.model';
import { InvRawMaterial } from 'src/app/models/inventory/invRawMaterial.model';
import { Orders } from 'src/app/models/inventory/orders.model';
import { AuditService } from 'src/app/services/audit.service';
import { ClientService } from 'src/app/services/client.service';
import { FirestoreOperationService } from 'src/app/services/firestore-operation.service';
import { InvRMService } from 'src/app/services/inv-rm.service';
import { MaterialService } from 'src/app/services/material.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { ShopOrderService } from 'src/app/services/shop-order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
  providers: [FirestoreOperationService, {provide: 'path', useValue: '/products'}]
})
export class AddOrderComponent{

  @Input() order: Orders;
  @Output() rL: EventEmitter<any> = new EventEmitter();

  submitted = false;
  Products?: any[];
  formObj: FormProp[][];

  currentIndex = -1;
  currentProduct: Product = {};
  
  id = ''
  query = '';
  codeFilter=false;
  disableNext = false;
  disablePrev = true;
  productsPerCall = 2;
  displayClients=false;
  queryChange?:string = undefined;
  lastInResponses?:any[] = []

  clientName:string = ''
  updateProducts = false;
  orderProducts:any[] = []

  constructor(private Productservice: ProductService, private shopService: ShopOrderService ,private invrmService: InvRMService,private materialService: MaterialService ,private orderService: OrderService, private fos: FirestoreOperationService ,private clientService: ClientService,private router: Router, private auditService: AuditService) { 
    this.order = history.state

    var shipDate = new FormProp('Fecha de Embarque' ,'shipDate', 'date'), 
        prodDays = new FormProp('Dias de Produccion' ,'productionDays', 'number',undefined, this.getProductionDays), 
        inputDays = new FormProp('Pedido de Insumos' ,'orderInput', 'number', undefined, this.getOrderInput);
       
    this.formObj = [
      [new FormProp('Numero de Orden de Pedido' ,'name', 'text')],
      [new FormProp('Nombre del Client' ,'clientName', 'text', undefined, this.getClientName)],
      [shipDate],
      [prodDays, inputDays],
      [
        new FormProp('Pedido Materia Prima' ,'rmOrderDeadline', 'date', undefined, this.getRmOrderDeadline, [shipDate, prodDays, inputDays]), 
        new FormProp('Limite inicio de Produccion' ,'startProductionDeadline', 'date', undefined, this.getStartProductionDeadline, [shipDate, prodDays, inputDays])
      ],
    ]
  }

  ngOnInit(): void {
    this.getOrderProducts()
    this.nextPage(true)
  }

  getOrderProducts(){
  if(!this.order.id) return

  this.orderService.getById(this.order?.id).snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>  ({ id: c.payload.doc.id, intel: c.payload.doc.data() })
      )
    )
  ).subscribe(data => {
    if(!data.length) return 

    const response:any[] = data 
    this.orderProducts = response[0].intel.Products;
    this.id = response[0].id
    if(this.orderProducts){
      this.updateProducts = true
    }else{
      this.updateProducts = false
    }
  });

  }

  nextPage(direction: boolean) {
  
  var anchor:any;
  if(direction){
    if(this.disableNext) return;
    
    if(this.Products?.length){
      this.lastInResponses?.push(this.Products[this.Products.length - 1])
    }  
    anchor = this.lastInResponses?.length ? this.lastInResponses[this.lastInResponses?.length - 1]: undefined;
  }else{
    if(this.disablePrev) return;
    this.lastInResponses?.pop();
    anchor = this.lastInResponses?.pop();
  }
  
  
  
  console.log('Info:', anchor, this.lastInResponses, this.queryChange)
  var req;
  if(this.queryChange){
    if(this.codeFilter){
      req = this.getService().filterByCodeBatch(this.queryChange,this.productsPerCall, anchor) as AngularFirestoreCollection<Object>
    }else{
      console.log(this.queryChange)
      req = this.getService().filterByNameBatch(this.queryChange,this.productsPerCall, anchor) as AngularFirestoreCollection<Object>
    }
  } else{
    req = this.getService().getNextBatch(this.productsPerCall, anchor) as AngularFirestoreCollection<Object>
  }
  
  req.snapshotChanges().pipe(
    map(changes => changes.map(c => 
      ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      if(!data.length){
        this.disableNext = true;
        return;
      }
      console.log(data  )
      this.Products = data;
      this.disableNext = data.length < this.productsPerCall; //What if last batch is exactly productPerCall
      this.disablePrev = anchor ? false: true
      
    }, error => {
      this.disableNext = false;
  });
  }

  filterProducts(): void {
    this.queryChange = this.query
    this.disableNext = false;
    this.disablePrev;
    this.Products = []
    this.lastInResponses = []
    this.nextPage(true)
  }

  setActiveProduct(product: any, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;

    if(this.displayClients){
      this.clientName = product.name
      this.order.clientId = product.id;
    }
  }
  
  addProductToOrder(product: any){
     var occurence = this.orderProducts.find(e => e.id == product.id)
     if(occurence) return;
     this.orderProducts.push({name: product.name, id: product.id, leadTime: product.leadTime, materialWaitMaxTime: product.materialWaitMaxTime, materials:product.materials})
  }


  getClientName = () => this.clientName

  getProductionDays = () => Math.ceil(this.orderProducts.map(e => e.leadTime * e.quantity).reduce((sum:number, element:number) => sum + element, 0))
  getOrderInput = () => {var max = Math.max(...this.orderProducts.map(e=>e.materialWaitMaxTime));  return max != -Infinity ? max: 0}
  
  getRmOrderDeadline = (shipDate: string, prodDays:number, inputDays:number) => {     
    if(!(shipDate && prodDays && inputDays )) return

    const rm = new Date(shipDate);
    rm.setDate(new Date(shipDate).getDate() - inputDays - prodDays)
    
    return this.formatDateString( rm.toLocaleDateString())
  }

  getStartProductionDeadline = (shipDate: string, prodDays:number, inputDays:number) => {
    if(!(shipDate && prodDays && inputDays )) return
    
    const pd = new Date(shipDate)
    pd.setDate(new Date(shipDate).getDate() - prodDays)
  
    return this.formatDateString(pd.toLocaleDateString())  
  }


  validateForm(){
    return new Date(this.order.rmOrderDeadline) > new Date()
  }


  removeProductFromOrder(materialIndex:any){
    this.orderProducts.splice(materialIndex, 1)
  }

  getService(){
    if(this.displayClients) return this.clientService;
    return this.Productservice;
  }

  showClientList(): void {
    this.queryChange = undefined
    this.disableNext = false;
    this.disablePrev= true;
    this.Products = []
    this.lastInResponses = []
    this.nextPage(true)
  }

  submit(order: any){
    this.order = order;
    this.editProducts()
  }

  getTotalMaterials(){
    if(!this.orderProducts) return []

    this.orderProducts.forEach(e => e.materials.forEach((el:any) => el.quantity *= e.quantity ))

    return this.orderProducts.flatMap( e => e.materials).reduce((pv, e)=> {
      pv[e.id] = pv[e.id] ? {name: e.name, quantity: pv[e.id].quantity + e.quantity, minBatch: e.minBatch} :  {name: e.name, quantity: e.quantity, minBatch: e.minBatch};
      return pv;
    }, {})
  }


  updateMaterialStock(){
   

    Object.entries(this.getTotalMaterials()).forEach( async (mat:any) => {
      var stock = await this.invrmService.getStock(mat[0]) || 0
      var stockUp:any;
      
      
      if(!(stock.available!=undefined && stock.commited!=undefined && stock.wating!=undefined && stock.watingCommited!=undefined)) return

      if(mat[1].quantity <= stock.available){
        stockUp = {commited: (+stock.commited) + mat[1].quantity, available: (+stock.available) - mat[1].quantity}
      }else {
        
        stockUp = {watingCommited: (+stock.watingCommited) +  mat[1].quantity - (+stock.available), commited: (+stock.commited) + (+stock.available), available: 0}

        if((mat[1].quantity - stock.available) <= stock.wating){
            stockUp = {wating: (+stock.wating) + (+stock.available) - mat[1].quantity, ...stockUp}
        }else{
          var req = mat[1].quantity - (+stock.available) - (+stock.wating);      
          var amount = req < mat[1].minBatch ? mat[1].minBatch - req: 0;

          stockUp = {wating: stock.wating + amount, ...stockUp}
          this.shopService.create(mat[0],mat[1].name,req + amount, amount, Timestamp.fromDate(new Date(this.order.rmOrderDeadline)),  stock.id)
        }
      }
      this.invrmService.update(stock.id, stockUp)
      this.makeStockReport(mat[0], mat[1].name, stock, stockUp) //Tddo Report Service Create report
    })

    alert('Orden Creada satisfactoriamente')
    
    this.router.navigate(['/orders'])
  } 

  makeStockReport(id:string, name:string, oldStock: any, newStock:any){

  }

  editProducts(){
    if(!this.validateForm()) {alert('La fecha de Limite del Pedido de material debe ser almenos 2 dias después del dia actual'); return}

    var products = this.orderProducts.map(e => ({id: e.id, name: e.name, quantity: e.quantity}))

    this.orderService.create({ orderProducts: products, state: 'Esperando Material', timestamp:  Timestamp.fromDate(new Date()), ...this.order}).then(() => {

      this.updateMaterialStock()
      // this.auditService.create(OrderService.name, 'Crear Orden', 'Jonny123')

    });
  }


  useFP(productId: string, index: number){
    if(this.codeFilter){
        this.Productservice.getById(productId).pipe(map(c => ({id: c.id, ...c.data()}))).subscribe(data =>  { 
        if(this.orderProducts){
            this.orderProducts[index].stock = data.stock ? data.stock: 0;
        }});
    }else{
      if(this.orderProducts){
        this.orderProducts[index].stock = ''   
      }
    }
  }
  
  formatDateString(date: string){
    return date.split('/').reverse().join('/').replace(/\//g,'-',)
  } 



}
