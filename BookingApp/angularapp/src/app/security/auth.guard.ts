import { Injectable } from '@angular/core';
import { tokenNotExpired } from "ng2-jwt";
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot,
  Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router:Router) {}

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    if (tokenNotExpired())
      return true;
    
    this.router.navigate(['']);     // return to login page
    
    return false;
  }
}