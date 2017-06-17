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

import { PlaceComponent} from './place/place.component';
import { PlaceService} from './services/place-service.component';

import { AuthGuard } from './security/auth.guard';
import { AlertComponent } from './alert/alert.component';
import { AlertService, AuthService, UserService } from './auth-services/index';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './registration/register.component';
import {RegionComponent} from './region/region.component';
import {RegionService} from './services/region-service.component';
import {AccommodationService} from './services/accommodation-service.component';
import { AccommodationComponent} from './accommodation/accommodation.component';

import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import { RoomComponent } from './room/room.component';
import { RoomService } from './services/room-service.component';

const Routes = [
  {path: "home", component: HomeComponent},
  {path: "country", component: CountryComponent, canActivate: [AuthGuard]},
  {path: "accommodation-type", component: AccommodationTypeComponent, canActivate: [AuthGuard]},
  {path: "login", component: LoginComponent},
  {path: "rooms", component: RoomComponent},
  {path: "register", component: RegisterComponent},

  // otherwise redirect to home page
  {path: '**', redirectTo: ''},
  {path: "country", component: CountryComponent},
  {path: "accommodation-type", component: AccommodationTypeComponent},  
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountryComponent,
    AccommodationTypeComponent,
    RegionComponent,
    AccommodationTypeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    PlaceComponent,
    MapComponent,
    AccommodationComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes),
     AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'})
  ],
  providers: [CountryService, AccommodationTypeService, AuthGuard, AlertService, UserService, AuthService, RegionService, PlaceService, AccommodationService, RoomService],  
  bootstrap: [AppComponent]
})
export class AppModule {}
