import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'IBMFurniture';
  constructor(public auth: AuthService){}
  isloggedIn$ = this.auth.user$.pipe(map(u => !!u))


}
