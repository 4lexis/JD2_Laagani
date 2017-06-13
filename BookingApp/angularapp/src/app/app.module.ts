import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent} from './home/home.component';

import { CountryComponent} from './country/country.component';
import { CountryService} from './services/country-service.component';

import { AccommodationTypeComponent} from './accommodation-type/accommodation-type.component';
import { AccommodationTypeService} from './services/accommodation-type-service.component';

import { AuthGuard } from './security/auth.guard';
import { AlertService, AuthService, UserService } from './auth-services/index';
import { LoginComponent } from './login/login.component';


const Routes = [
  {path: "home", component: HomeComponent},
  {path: "country", component: CountryComponent, canActivate: [AuthGuard]},
  {path: "accommodation-type", component: AccommodationTypeComponent, canActivate: [AuthGuard]},
  {path: "login", component: LoginComponent},

  // otherwise redirect to home page
  {path: '**', redirectTo: ''}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountryComponent,
    AccommodationTypeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [CountryService, AccommodationTypeService, AuthGuard, AlertService, UserService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
