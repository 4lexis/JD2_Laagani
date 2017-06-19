import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {InlineEditorModule} from 'ng2-inline-editor';
import { ModalModule } from "ng2-modal";

import { AppComponent } from './app.component';
import { HomeComponent} from './home/home.component';

import { CountryComponent} from './country/country.component';
import { CountryService} from './services/country-service.component';
import { CommentService } from './services/comment-service.component';
import { RoomReservationService } from './services/room-reservation.service';

import { AccommodationTypeComponent} from './accommodation-type/accommodation-type.component';
import { AccommodationTypeService} from './services/accommodation-type-service.component';

import { PlaceComponent} from './place/place.component';
import { PlaceService} from './services/place-service.component';

import { AuthGuard } from './security/auth.guard';
import { AlertComponent } from './alert/alert.component';
import { AlertService, AuthService, UserService } from './auth-services/index';
import { LoginComponent } from './login/login.component';
import { RoomReservationComponent } from "./room-reservation/room-reservation.component";
import { RegisterComponent } from './registration/register.component';
import {RegionComponent} from './region/region.component';
import {RegionService} from './services/region-service.component';
import {AccommodationService} from './services/accommodation-service.component';
import { AccommodationComponent} from './accommodation/accommodation.component';
import { UserComponent } from './user/user.component';
import { CommentComponent } from './comment/comment.component';
import { RoomComponent } from './room/room.component';
import { RoomService } from './services/room-service.component';

import { AgmCoreModule } from "@agm/core";
import { MapComponent } from "./map/map.component";
import { GlobalMapComponent } from "./map/global-map.component";
import { AccommodationDetailsComponent } from './accommodation/accommodation-details.component';

const Routes = [
  {path: "home", component: HomeComponent},
  {path: "country", component: CountryComponent, canActivate: [AuthGuard]},
  {path: "accommodation-type", component: AccommodationTypeComponent, canActivate: [AuthGuard]},
  {path: "login", component: LoginComponent},
  {path: "rooms", component: RoomComponent},
  {path: "register", component: RegisterComponent},
  {path: "user", component: UserComponent, canActivate: [AuthGuard]},
  {path: "comment", component: CommentComponent},
  {path: "room-reservation", component: RoomReservationComponent},
  {path: "accommodation", component: AccommodationComponent},
  {path: "accommodation-details/:id", component: AccommodationDetailsComponent},
  {path: "rooms", component: RoomComponent},

  // otherwise redirect to home page
  {path: '**', redirectTo: ''}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountryComponent,
    AccommodationTypeComponent,
    RegionComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    PlaceComponent,
    MapComponent,
    AccommodationComponent,
    RoomComponent,
    UserComponent,
    CommentComponent,
    RoomReservationComponent,
    GlobalMapComponent,
    AccommodationDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes),
     AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'}),
     InlineEditorModule,
     ModalModule
  ],
  providers: [CountryService, AccommodationTypeService, AuthGuard, AlertService, RoomReservationService,
              UserService, AuthService, RegionService, PlaceService, AccommodationService, RoomService, CommentService],  
  bootstrap: [AppComponent]
})
export class AppModule {}
