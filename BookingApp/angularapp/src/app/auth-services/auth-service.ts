import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from "ng2-jwt";

import { AppUser } from "../model/app-user";
 
@Injectable()
export class AuthService {


    token = "";


    constructor(private http: Http) { }

    login(username: string, password: string) {        
        this.http.post('http://localhost:54042/oauth/token', 'username='+username+'&password='+password+'&grant_type=password')
            .map(res => res.json())
            .subscribe(
                data =>  {
                    localStorage.setItem('id_token', data.access_token);
                   localStorage.setItem("currentUsername", username);
                },
                error => console.log('auth service error: ' + error)
            );
    }
 
    logout() {
        // remove user from local storage to log user out
        //localStorage.removeItem('currentUser');
        localStorage.removeItem('id_token');
        localStorage.removeItem('currentUsername');
    }

    register(user: AppUser) {
        this.http.post('http://localhost:54042/register', JSON.stringify(user))
            .map(res => res.json())
            .subscribe(
                data =>  {
                    console.log("registration ok");
                },
                error => console.log('auth service error: ' + error)
            );
    }

    loggedIn() {
        return tokenNotExpired();
    }
}