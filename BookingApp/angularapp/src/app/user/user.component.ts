import { Component, OnInit } from '@angular/core';
import { AppUser } from '../model/app-user';
import { UserService, AlertService } from '../auth-services/index';
import { NgForm } from '@angular/forms';
import { InlineEditorComponent } from 'ng2-inline-editor';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {

  model: any = {};
  users: Array<AppUser>;
  isVisible: boolean = false;
  outRoles: [{ value: string, text: string }] = [{ value: "", text: "" }];

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
          this.outRoles.push({ value: roles[r], text: roles[r] });
        }
      });
  }

  onSave(user: AppUser) {
    //console.log("role: " + JSON.stringify(user));
    
    // Fix user edit role value
    // If you editing role, role is array
    // If you editing something else, role is a single value
    if (user.Role.length == 1)
      user.Role = user.Role[0];

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
    //console.log("new user: " + JSON.stringify(user));
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
    //console.log("removing user: " + JSON.stringify(user));
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

  ban(user: AppUser)
  {
    if (user.Role.length == 1)
    {
      user.Role = user.Role[0];
    }
    
    user.Banned=true;
    this.userService.update(user).subscribe(()=> this.getUsers());
  }

  unban(user: AppUser): void
  {
    if (user.Role.length == 1)
    {
      user.Role = user.Role[0];
    }
    user.Banned=false;
    this.userService.update(user).subscribe(()=> this.getUsers());
  }


}