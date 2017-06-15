import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from "ng2-jwt";

import { AppUser } from "../model/app-user";
import { UserService } from "./user-service";
import { AlertService } from "./alert-service";
 
@Injectable()
export class AuthService {


    token = "";


    constructor(
        private http: Http,
        private auth: UserService,
        private alertService: AlertService) { }

    login(user: AppUser) {
        
        this.http.post('http://localhost:54042/oauth/token', 'username='+user.Username+'&password='+user.Password+'&grant_type=password')
            .map(res => res.json())
            .subscribe(
                data =>  {
                    localStorage.setItem('id_token', data.access_token);
                    localStorage.setItem("currentUser", user.Username);
                    this.auth.getByUsername(user.Username).subscribe(
                        data => {
                            this.alertService.success('Login successful', true);
                            localStorage.setItem('currentRole', data);
                        },
                        error => {
                            this.alertService.error(error);
                        });
                },
                error => this.alertService.error(error)
            );
    }
 
    logout() {
        // remove user from local storage to log user out
        //localStorage.removeItem('currentUser');
        localStorage.removeItem('id_token');
        localStorage.removeItem('currentRole');
        localStorage.removeItem("currentUser");
    }

    loggedIn() {
        return tokenNotExpired();
    }
}