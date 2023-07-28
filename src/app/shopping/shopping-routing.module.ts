import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopListComponent } from './shop-list/shop-list.component';
import { AddShopOrderComponent } from './add-shop-order/add-shop-order.component';

const routes: Routes = [
  {path: '', component: ShopListComponent},
  {path: 'add', component: AddShopOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
