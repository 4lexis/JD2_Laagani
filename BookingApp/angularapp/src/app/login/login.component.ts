import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-services/auth-service';
import { Router, ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms';
 

import { AlertService } from "../auth-services/index";
import { AppUser } from "../models/app-user";

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    user: AppUser;
    loading = false;
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
    this.auth.login(user.username, user.password);
    form.reset();
  }
}