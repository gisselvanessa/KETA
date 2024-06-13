import { Component } from '@angular/core';
import { AuthService } from './components/moduleusers/services/auth.service';
import { UserService } from './components/moduleusers/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'helpdesk';
  constructor (public authService: AuthService, public usersServices: UserService) { }
  logout() {
    this.authService.logout();
  }
}
