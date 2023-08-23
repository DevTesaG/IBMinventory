import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShopListComponent } from './shop-list/shop-list.component';
import { AddShopOrderComponent } from './add-shop-order/add-shop-order.component';
import { SharedModule } from '../shared/shared.module';
import { DatePipe } from '../directives/date.pipe';


@NgModule({
  declarations: [
    ShopListComponent,
    AddShopOrderComponent,
    DatePipe
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    SharedModule
  ]
})
export class ShoppingModule { }
