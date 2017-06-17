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
        .then(country => 
        {
          this.countries = country
          this.selectedCnt = this.countries[0];
        })
  }

  onSubmit(region: Region, form: NgForm) {
    console.log(region);
    this.region=region;
    this.region.Country_Id=this.selectedCnt.Id;    
    console.log(this.region);
    this.save();
    form.reset();       
  }  

  save(): void {
    this.regionService.create(this.region).then(()=>this.getRegions());
  }

 private logDropdown(id: number): void {
      for(let i=0; i<this.countries.length; i++)
      {
        if(this.countries[i].Id == id)
        {
          this.selectedCnt=this.countries[i];
          console.log(this.selectedCnt);
          break;
        }
      }
    } 
}