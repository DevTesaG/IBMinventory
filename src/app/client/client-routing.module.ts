import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { AddClientComponent } from './add-client/add-client.component';

const routes: Routes = [
  {path:'', component:ClientListComponent},
  {path:'add', component:AddClientComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class ClientRoutingModule { }
