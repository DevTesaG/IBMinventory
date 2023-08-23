import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderProductsComponent } from './order-products/order-products.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { OrderProvidersComponent } from './order-providers/order-providers.component';

const routes: Routes = [
  {path:'', component:OrdersListComponent},
  {path:'add', component:OrderProductsComponent},
  {path:'add/create', component:AddOrderComponent},
  {path:'add/providers', component:OrderProvidersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
