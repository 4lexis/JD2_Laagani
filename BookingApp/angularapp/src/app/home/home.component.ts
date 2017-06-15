import { Component, OnInit } from '@angular/core';

import { UserService } from "../auth-services/index";
import { AppUser } from "../model/app-user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {


    users: AppUser[] = [];

    constructor(private userService: UserService) {
        
    }
 
    ngOnInit() {

    }
 
    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }
 
    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
       // this.users = this.userService.getAll();
        console.log("users: " + this.users);
    }
}