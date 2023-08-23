import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OrderProductsComponent } from './order-products/order-products.component';
import { OrderProvidersComponent } from './order-providers/order-providers.component';

@NgModule({
  declarations: [
    OrdersListComponent,
    AddOrderComponent,
    OrderDetailsComponent,
    OrderProductsComponent,
    OrderProvidersComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ]
})
export class OrdersModule { }
