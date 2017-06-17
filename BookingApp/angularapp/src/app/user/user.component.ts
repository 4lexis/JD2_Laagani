import { Component, OnInit } from '@angular/core';
import { AppUser } from '../model/app-user';
import { UserService, AlertService }  from '../auth-services/index';
import {NgForm} from '@angular/forms';
import {InlineEditorComponent} from 'ng2-inline-editor';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {

    model: any = {};
    user: AppUser;
    users: Array<AppUser>;
    isVisible: boolean = false;
    outRoles: [{value: string, text: string}] = [{value: "", text: ""}];

    constructor(
      private userService: UserService,
      private alertService: AlertService) { }
    
    ngOnInit() {
      this.getRoles();
      this.getUsers();
    }

    getUsers() {
      this.userService
          .getAll()
          .subscribe(users => {
              this.users = users;
              for (let r in this.users) {
                this.userService.getRoleByUsername(this.users[r].Username)
                  .subscribe(role => this.users[r].Role = role);
              }
          }) 
    }

    getRoles(): void {
      this.userService
        .getAllRoles()
        .subscribe(roles => {
          for (let r in roles) {
             this.outRoles.push({value: roles[r], text: roles[r]});
          }
        });
    }

    onSave(user: AppUser) {
      console.log("editing user: " + JSON.stringify(user));
      console.log("role: " + user.Role);
      this.userService.update(user)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('User edited successfully', true);
                },
                error => {
                    this.alertService.error(error);
                });
    }  

    onSubmit(user: AppUser, form: NgForm) {
      console.log("new user: " + JSON.stringify(user));
      this.userService.create(user)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('User created successfully', true);
                },
                error => {
                    this.alertService.error(error);
                });
      form.reset();
      this.isVisible = false;
    }

    removeUser(user: AppUser) {
      console.log("removing user: " + JSON.stringify(user));
      this.userService.delete(user.Username)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('User removed successfully', true);
                },
                error => {
                    this.alertService.error(error);
                });
    }

    toggle() {
      this.isVisible = !this.isVisible;
    }

  
}