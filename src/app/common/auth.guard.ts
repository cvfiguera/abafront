import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate() {

    if (this.auth.isTokenExpired()) {
        this.router.navigateByUrl('/login');
        return false;
    }
    return true;
  }
}


