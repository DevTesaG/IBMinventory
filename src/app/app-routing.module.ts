import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [
  // {path: 'home',  component:HomeComponent, },
  {path: 'clients',   loadChildren: () => import('./client/client.module').then(m => m.ClientModule), canActivate: [AuthGuard]},
  // {path: 'materials',   loadChildren: () => import('./material/material.module').then(m => m.MaterialModule)},
  {path: 'materials',   loadChildren: () => import('./material/material.module').then(m => m.MaterialModule), canActivate: [AuthGuard]},
  // {path: 'products',   loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
  {path: 'products',   loadChildren: () => import('./product/product.module').then(m => m.ProductModule), canActivate: [AuthGuard]},
  {path: 'orders',   loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule), canActivate: [AuthGuard]},
  // {path: 'shop',   loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule)},
  {path: 'shop',   loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule), canActivate: [AuthGuard]},
  // {path: 'history',   loadChildren: () => import('./history/history.module').then(m => m.HistoryModule), },
  {path: 'history',   loadChildren: () => import('./history/history.module').then(m => m.HistoryModule), canActivate: [AuthGuard]},
  {path: 'login',  component:LoginComponent},
  {path: '', redirectTo:'orders',pathMatch:'full'},
  {path: '404', redirectTo: 'orders'},
  {path: '**', redirectTo:'/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
