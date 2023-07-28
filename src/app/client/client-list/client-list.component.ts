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
    ).subscribe(data => {console.log(data); this.Clients?.push(data); this.setActiveClient(data, 0)})
    
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

  filterClients(): void {
    if(!this.query){
      this.retrieveClientClients()
      return;
    }
    
    var q;
    if(this.codeFilter){
      q = this.ClientService.filterByCode(this.query)
    }else{
      q = this.ClientService.filterByName(this.query) 
    }

    q.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.Clients = data;
      console.log(data)
    });
  }

  setActiveClient(client: Client, index: number): void {
    this.currentClient = client;
    this.currentIndex = index;
  }


}
