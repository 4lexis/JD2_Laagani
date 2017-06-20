import { Component, OnInit } from '@angular/core';
import {Country} from '../model/country';
import { CountryService }  from '../services/country-service.component';
import {NgForm} from '@angular/forms';
import { FilterPipe } from '../filter/pipe';
import { Pipe, PipeTransform } from '@angular/core';


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
    this.countryService.create(this.singleCountry).then( ()=> this.getCountries());
  }

  delte(country): void
  {
    this.singleCountry=country;
    this.countryService.delete(this.singleCountry.Id).then(()=>this.getCountries());
  }

  onEdit(country: Country):void
  {
    this.countryService.update(country).then( () => this.getCountries());
  }

}