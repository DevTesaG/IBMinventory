import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormProp } from 'src/app/models/form-prop.model';
import { OrderProductsComponent } from '../order-products/order-products.component';
import { NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { InvRMService } from 'src/app/services/inv-rm.service';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-order-providers',
  templateUrl: './order-providers.component.html',
  styleUrls: ['./order-providers.component.css']
})
export class OrderProvidersComponent implements OnInit {

  formObj:any
  materials:any[] = []
  reqMaterials:any[] = []
  providers:any[] = []
  orderProducts:any[] = []
  currentMaterial:any
  currentProvider:any
  currentIndex:any


  constructor(private invrmService: InvRMService, private provService: ProviderService, private router: Router) {
    this.formObj = [
      [new FormProp('Nombre' ,'name', 'text'), new FormProp('Lote Minimo' ,'minBatch', 'number')],
      [new FormProp('Descripcion' ,'description', 'text')],
      [new FormProp('Precio' ,'price', 'number')],
      [new FormProp('Cantidad en Inventario' ,'available', 'number')],
      [new FormProp('Tiempo de Entrega', 'deliveryTime', 'number')] ,
      [new FormProp('Area', 'area', 'text'),new FormProp('Zona', 'zone', 'text'), new FormProp('Posicion', 'position', 'text') ]
    ] 
   }

  ngOnInit(): void { 
    this.orderProducts = history.state.products
    if(!history.state.materials) this.router.navigate(['/orders/add'])
    this.materials = this.updateMaterialStock(history.state.materials)
    this.reqMaterials = this.materials
    this.reqMaterials.filter((m:any)=> m.requestMaterial==true)
    this.materials.filter((m:any) => m.requestMaterial==false)
  } 

  q = '';
  query = '';



  updateMaterialStock(materials:any[]){
    if(!materials) return []
    var matStock:any[] = [];
    Object.entries(materials).forEach( async (mat:any, index) => {
      const {id, ...stock} = await this.invrmService.getStock(mat[0]) || 0
      var stockUp:any;
      var request = false;
      var req = 0
      
      if(!(stock.available!=undefined && stock.commited!=undefined && stock.wating!=undefined && stock.watingCommited!=undefined)) return

      if(mat[1].quantity <= stock.available){
        stockUp = {commited: (+stock.commited) + mat[1].quantity, available: (+stock.available) - mat[1].quantity}
      }else {
        
        stockUp = {watingCommited: (+stock.watingCommited) +  mat[1].quantity - (+stock.available), commited: (+stock.commited) + (+stock.available), available: 0}

        if((mat[1].quantity - stock.available) <= stock.wating){
            stockUp = {wating: (+stock.wating) + (+stock.available) - mat[1].quantity, ...stockUp}
        }else{
          req = mat[1].quantity - (+stock.available) - (+stock.wating);      
          request = true;
        }
      }

      matStock.push( {matId:mat[0], name:mat[1].name, stockId: id, oldStock: stock, newStock: stockUp, requestMaterial: request, requested: req})
    })

    console.log(matStock)
    return matStock
  } 



  initMaterialOrder(){
    this.reqMaterials.forEach(mat => {
      var amount = mat.requested < mat.minBatch ? mat[1].minBatch - mat.requested: 0;
      mat.newStock.wating += amount
      mat.amount = amount
    })
  }


  filter(){
    this.q = this.query
  }


  async setActiveMaterial(mat:any, i:any){
    this.providers = []
    this.currentProvider = undefined
    this.currentMaterial = mat;
    this.currentIndex = i;

    this.providers = await this.provService.getProvidersByMaterial(this.currentMaterial.matId)
  }

  assignProvider(){
    this.reqMaterials[this.currentIndex].minBatch = this.currentProvider.minBatch
    this.reqMaterials[this.currentIndex].deliveryTime = this.currentProvider.deliveryTime
    this.reqMaterials[this.currentIndex].price = this.currentProvider.price
    alert('Provedor asignado satisfactoriamente')
  }

  
  getOrderWaitMaxTime() {
    return Math.max(...this.reqMaterials.map(e=>e.deliveryTime))
  }

  getSelectedElement(element: any){
    this.currentMaterial = element.element
  }

  submit(prov:any){
    if(!prov) return 

    this.initMaterialOrder()
    
    const order = {
      orderWaitMaxTime: this.getOrderWaitMaxTime(),
      materials: this.materials,
      reqMaterials: this.reqMaterials,
      orderProducts: this.orderProducts
    }
    this.router.navigate(['orders/add/create'], { state: {order: order} });
  }

}
