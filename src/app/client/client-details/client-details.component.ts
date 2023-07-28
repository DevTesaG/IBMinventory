import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from 'src/app/models/catalogue/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  @Input() client?: Client;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentClient: Client = {
    name: '',
    code: '',
    phone: 0,
    address: '',
  };
  message = '';

  
  constructor(private ClientService: ClientService) { }

  ngOnInit(): void {
    
    
    
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentClient = { ...this.client };
  }

  updateClient(): void {
    const data = {
      name: this.currentClient.name,
      code: this.currentClient.code,
      phone: this.currentClient.phone,
      address: this.currentClient.address,
    };

    if (this.currentClient.id) {
      this.ClientService.update(this.currentClient.id, data)
        .then(() => this.message = 'The Client was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteClient(): void {
    if (this.currentClient.id) {
      this.ClientService.delete(this.currentClient.id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'The Client was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }


}
