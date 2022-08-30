import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private service: UserService, private router: Router) {}

  isLoggedin = this.service.isUserLoggedIn;

  onLogout() {
    this.service.logout();
    this.router.navigate(['/home']);
  }
}
