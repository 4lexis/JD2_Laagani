import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent} from './home/home.component';
import { CountryComponent} from './country/country.component';
import { CountryService} from './services/country-service.component';

const Routes = [
  {path: "home", component: HomeComponent},
  {path: "country", component: CountryComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountryComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
