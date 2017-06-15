import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-services/auth-service';
import { Router, ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';
 
import { AlertService } from "../auth-services/index";
import { AppUser } from "../model/app-user";

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    model: any = {};
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.auth.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

  onLogin(user: AppUser, form: NgForm) {
      debugger
    this.auth.login(user.Username, user.Password);
    form.reset();
  }
}