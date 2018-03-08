import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { HeaderLoginComponent } from './../layout/header-login/header-login.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ],
  providers: [AuthService]
})
export class LoginComponent {
  constructor(public router: Router, private authService: AuthService) {}
  login(event, username, password) {
    event.preventDefault();
    this.authService.getToken(username, password)
      .subscribe(
          response => {
            this.router.navigateByUrl('/dashboard');
          },
          error => {
            alert(error);
          }
      );
 }
}