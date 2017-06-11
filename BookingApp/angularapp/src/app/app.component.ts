import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  /*template: 
  `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/home" routerLinkActive="active">Home</a>
      <a routerLink="/country" routerLinkActive="active">Country</a>
    </nav>
    <router-outlet></router-outlet>
  `*/
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookingApp';
}
