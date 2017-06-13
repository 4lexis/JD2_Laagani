import { Component, OnInit } from '@angular/core';
import {Country} from '../model/country';
import { CountryService }  from '../services/country-service.component';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html'
})

export class CountryComponent implements OnInit {

  country:Country[];
  error:string;
  singleCountry:Country;

  constructor(private countryService: CountryService) { }

  ngOnInit() 
  {
    this.getCountries();
  }

  getCountries(): void {
    this.countryService
        .getCountries()
        .then(country => this.country = country)        
  }

  onSubmit(singleCountry: Country, form: NgForm) {
    console.log(singleCountry);
    this.singleCountry=singleCountry;
    this.save();
    form.reset();    
  }

  save(): void {
    this.countryService.create(this.singleCountry);    
  }

}