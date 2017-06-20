import { Component, OnInit } from '@angular/core';
import { Region } from '../model/region';
import { Country } from '../model/country';
import { RegionService } from '../services/region-service.component';
import { CountryService } from '../services/country-service.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html'
})
export class RegionComponent implements OnInit {

  public regions: Array<Region> = new Array<Region>();
  error: string;
  region: Region = new Region();
  countries: Array<Country> = new Array<Country>();
  selectedCnt: Country;
  outCnts: [{ value: number, text: string }] = [{ value: 0, text: "" }];

  constructor(private regionService: RegionService, private countryService: CountryService) {
  }

  ngOnInit() {
    this.getRegions();
    this.getCountries();
  }


  getRegions(): void {

    this.regionService
      .getRegions()
      .then(regions => {
      this.regions = regions;
        for (let re in this.regions) {
          this.countryService.getCountry(this.regions[re].Country_Id).then(country => this.regions[re].Country = country);
        }
      }
      );
  }

  getCountries(): void {
    this.countryService
      .getCountries()
      .then(country => {
        this.countries = country
        this.selectedCnt = this.countries[0];
        this.outCnts.pop();
        for (let cnt in this.countries) {
          this.outCnts.push({ value: this.countries[cnt].Id, text: this.countries[cnt].Name });
        }
      })
  }

  onSubmit(region: Region, form: NgForm) {
    console.log(region);
    if (form.valid) {
      this.region = region;
      this.region.Country_Id = this.selectedCnt.Id;
      console.log(this.region);
      this.save();
      form.reset();
    }
  }

  save(): void {
    this.regionService.create(this.region).then(() => this.getRegions());
  }

  onEdit(region: Region): void {
    //debugger
    for (let cnt in this.countries) {
      if (this.countries[cnt].Id == region.Country_Id) {
        region.Country = this.countries[cnt];
        region.Country_Id = this.countries[cnt].Id;
        break;
      }
    }
    this.regionService.update(region).then(() => this.getRegions());
  }

  delte(region: Region): void {
    this.region = region;
    this.regionService.delete(this.region.Id).then(() => this.getRegions());
  }

  private logDropdown(id: number): void {
    for (let i = 0; i < this.countries.length; i++) {
      if (this.countries[i].Id == id) {
        this.selectedCnt = this.countries[i];
        console.log(this.selectedCnt);
        break;
      }
    }
  }
}