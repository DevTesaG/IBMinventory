import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Client } from 'src/app/models/catalogue/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {


  Clients?:Client[] = [];
  currentClient?:Client;
  currentIndex = -1;
  title = '';
  query = '';
  codeFilter = false;
  queryChange:any;

  constructor(private ClientService:ClientService) { }

  ngOnInit(): void {
    history.state.id ? this.retrieveClientById(history.state.id) : this.retrieveClientClients();
  }

  refreshList(): void {
    this.currentClient = undefined;
    this.currentIndex = -1;
    this.retrieveClientClients();
  }

  retrieveClientById(id: string):void{
    this.ClientService.getById(id).pipe(
      map(c => ({id: c.id, ...c.data()}))
    ).subscribe(data => {console.log(data); this.Clients?.push(data); this.currentClient = data})
    
  }

  retrieveClientClients(): void {
    this.ClientService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.Clients = data;
    });
  }

  filter(): void {
    this.currentClient = undefined
    this.currentIndex = -1
    this.queryChange = this.codeFilter ? {key:'code', value:this.query} : this.query;
  }

  getSelectedElement(element:any): void {
    this.currentClient = element.element;
    this.currentIndex = element.index;
  }


}
