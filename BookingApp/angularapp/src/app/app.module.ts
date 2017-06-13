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

import {RegionComponent} from './region/region.component';
import {RegionService} from './services/region-service.component';


const Routes = [
  {path: "home", component: HomeComponent},
  {path: "country", component: CountryComponent},
  {path: "accommodation-type", component: AccommodationTypeComponent},  
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountryComponent,
    AccommodationTypeComponent,
    RegionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [CountryService, AccommodationTypeService, RegionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
