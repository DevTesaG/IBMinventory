import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from 'src/app/models/catalogue/client.model';
import { AuthService } from 'src/app/services/auth.service';
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
  userRole?:string;
  
  constructor(private ClientService: ClientService, private auth: AuthService) { 
    this.auth.user$.subscribe((data => this.userRole = data?.userRole))
  }

  ngOnInit(): void {
    
    
    
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentClient = { ...this.client };
  }


  updateClient(): void {
    const data = {
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
