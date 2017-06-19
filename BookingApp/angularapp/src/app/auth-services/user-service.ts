import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppUser } from '../model/app-user';

@Injectable()
export class UserService {


    url = "http://localhost:54042/api/AppUsers/";
    url2 = "http://localhost:54042/api/BAIdentityUsers/";
    rolesUrl = "http://localhost:54042/roles/";

    constructor(private http: Http) { }

    getAll() {

        /*
        var ret: AppUser[] = [];
 
        this.http.get('http://localhost:54042/api/AppUsers').
            map(res => res.json())
            .subscribe(res => {
                console.log("res: " + res[0].Username);
                ret = res;
            });
        return ret;
         */
        return this.http.get(this.url, this.jwt()).map((response: Response) => response.json());
    }

    
    getAllRoles() {
        return this.http.get(this.rolesUrl, this.jwt()).map((response: Response) => response.json());
    }
    


    getRoleByUsername(username: string) {
        return this.http.get(this.rolesUrl + username).map((response: Response) => response.json());
    }

    create(user: AppUser) {
        console.log("new user: " + JSON.stringify(user));
        return this.http.post(this.url, user).map((response: Response) => response.json());
    }

    update(user: AppUser) {
        return this.http.put(this.url + user.Id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: string) {
        console.log("id: " + id);
        return this.http.delete(this.url + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = localStorage.getItem('currentUser');
         let token = localStorage.getItem('id_token');

         //console.log("currentUser: " + currentUser);
         //console.log("token: " + token);

        if (currentUser && token) {
            console.log("currentUser: " + currentUser);
            let headers = new Headers({ 'Authorization': 'Bearer ' + token });
            return new RequestOptions({ headers: headers });
        }
    }
}