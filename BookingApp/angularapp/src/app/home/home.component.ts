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

}