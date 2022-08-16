import { Component } from '@angular/core';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private service: UserService) {}

  isLoggedin = this.service.isUserLoggedIn;

  onLogout() {
    this.service.logout();
  }
}
