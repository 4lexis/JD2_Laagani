import { Component, OnInit } from '@angular/core';
import { Region} from '../model/region';
import {Country} from '../model/country';
import { RegionService }  from '../services/region-service.component';
import { CountryService }  from '../services/country-service.component';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html'
})
export class RegionComponent implements OnInit {

  public regions:Array<Region> = new Array<Region>();
  error:string;
  region:Region = new Region();
  countries: Array<Country> = new Array<Country>();
  selectedCnt: Country;

  constructor(private regionService: RegionService, private countryService: CountryService) 
  {                 
  }

  ngOnInit() 
  {
    this.getRegions();
    this.getCountries();
  }  
  

  getRegions(): void {
    
    this.regionService
        .getRegions()
        .then(regions =>{ this.regions = regions;
        for(let re in this.regions)
        {
            this.countryService.getCountry(this.regions[re].Country_Id).then(country => this.regions[re].Country=country);        
        }   
    }
        );        
  }

  getCountries(): void {
    this.countryService
        .getCountries()
        .then(country => this.countries = country)        
  }

  onSubmit(region: Region, form: NgForm) {
    console.log(region);    
    this.region=region;    
    this.region.Country_Id = region.Country.Id;
    this.save();
    form.reset();       
  }  

  save(): void {
    this.regionService.create(this.region);
  }

 private logDropdown(id: number): void {
   
        this.countryService.getCountry(id).then(country => {
          this.selectedCnt=country
          console.log(this.selectedCnt);
      });
    }
 

}