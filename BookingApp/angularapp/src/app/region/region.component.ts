import { Component, OnInit } from '@angular/core';
import { Region} from '../model/region';
import { RegionService }  from '../services/region-service.component';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html'
})
export class RegionComponent implements OnInit {

  regions:Region[];
  error:string;
  region:Region;

  constructor(private regionService: RegionService) { }

  ngOnInit() 
  {
    this.getRegions();
  }

  getRegions(): void {
    this.regionService
        .getRegions()
        .then(regions => this.regions = regions)        
  }

  onSubmit(region: Region, form: NgForm) {
    console.log(region);
    this.region=region;
    this.save();
    form.reset();       
  }

  save(): void {
    this.regionService.create(this.region);
  }
 

}