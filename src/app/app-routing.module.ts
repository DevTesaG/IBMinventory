import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [
  {path: '', redirectTo:'home',pathMatch:'full'},
  {path: 'login',  component:LoginComponent},
  {path: 'home',  component:HomeComponent},
  {path: 'clients',   loadChildren: () => import('./client/client.module').then(m => m.ClientModule), canActivate: [AuthGuard]},
  {path: 'materials',   loadChildren: () => import('./material/material.module').then(m => m.MaterialModule)},
  {path: 'products',   loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
  {path: 'orders',   loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)},
  {path: 'shop',   loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule)},
  {path: 'history',   loadChildren: () => import('./history/history.module').then(m => m.HistoryModule
    )}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
