import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { tokenNotExpired } from "ng2-jwt";
 
@Injectable()
export class AuthService {

    constructor(private http: Http) { }
 
    login(username: string, password: string) {

        this.http.post('/ouath/token', JSON.stringify({ username: username, password: password }))
            .map(res => res.json())
            .subscribe(
                data => localStorage.setItem('id_token', data.id_token),
                error => console.log('auth service error: ' + error)
            );

        /*
        this.dataService.getUserDetails().subscribe(
                    (data) => {
                        console.log('fetched userdata for edit', data.results)
                        this.modify_users = data.results;
                        console.log(data.results);
                        console.log(this.modify_users);
                    },
                    (error) => {
                        console.log('Failure viewUserDetails');
                        alert('Error getting user Details to edit');
                    });
        */
        
        /*
        return this.http.post('/oauth/token', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {

                    tokenNotExpired().

                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
        */       
    }
 
    logout() {
        // remove user from local storage to log user out
        //localStorage.removeItem('currentUser');
        localStorage.removeItem('id_token');
    }

    loggedIn() {
        return tokenNotExpired();
    }
}