import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
//import { AuthService } from './auth.service';           // greska jer ne postoji jos uvek

@Injectable()
export class CanActivateViaAuthGuard{ //implements CanActivate {
/*
  constructor(private authService: AuthService) {}          // to je taj...treba dodati u user-a -> isLoggedIn();

  canActivate() {
    return this.authService.isLoggedIn();
  }
  */

}