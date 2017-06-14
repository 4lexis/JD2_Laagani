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
import { AlertComponent } from './alert/alert.component';
import { AlertService, AuthService, UserService } from './auth-services/index';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './registration/register.component';
import {RegionComponent} from './region/region.component';
import {RegionService} from './services/region-service.component';


const Routes = [
  {path: "home", component: HomeComponent},
  {path: "country", component: CountryComponent, canActivate: [AuthGuard]},
  {path: "accommodation-type", component: AccommodationTypeComponent, canActivate: [AuthGuard]},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "country", component: CountryComponent},
  {path: "accommodation-type", component: AccommodationTypeComponent}, 

  // otherwise redirect to home page
  {path: '**', redirectTo: ''} 
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountryComponent,
    AccommodationTypeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    AccommodationTypeComponent,
    RegionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [CountryService, AccommodationTypeService, RegionService, AuthGuard, AlertService, UserService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
