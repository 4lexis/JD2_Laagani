import { Component, OnInit } from '@angular/core';
import { AppUser } from '../model/app-user';
import { UserService }  from '../auth-services/user-service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {

    user: AppUser;
    users: AppUser[];
    roles: string[];
    selectedRole: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log("usao u inti");
    this.getUsers();
   // this.getRoles();
  }

  getUsers() {
    this.userService
        .getAll()
        .subscribe(users => {
            console.log("usersss: " + users);
            this.users = users;
            console.log("users: " + JSON.stringify(this.users));
            for (let r in this.users) {
              this.userService.getRoleByUsername(this.users[r].Username)
                .subscribe(role => this.users[r].Role = role);
            }
        })
        
  }

  getRoles(): void {
    this.userService
      .getAllRoles()
      .subscribe(roles => this.roles = roles);
  }

  onSubmit(user: AppUser, form: NgForm) {
    console.log(user);
    this.user = user;
  
    
    this.save();
    form.reset();       
  }  

  save(): void {
    this.userService.create(this.user);
  }

  
}