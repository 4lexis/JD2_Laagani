import { Component, OnInit } from '@angular/core';
import { Place} from '../model/place';
import { PlaceService }  from '../services/place-service.component';
import { Region} from '../model/region';
import { RegionService }  from '../services/region-service.component';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html'
})

export class PlaceComponent implements OnInit {

    places: Place[];
    place: Place;
    regions: Region[];
    selectedRegion: Region;
  

  constructor(private placeService: PlaceService, private regionService: RegionService) { }

  ngOnInit() 
  {
    this.getPlaces();
    this.getRegions();
  }

  getPlaces(): void {
    this.placeService
        .getPlaces()
        .then(place => 
        {
            this.places = place
            for(let re in this.places)
            {
                this.regionService.getRegion(this.places[re].Region_Id).then(region => this.places[re].Region=region);        
            }
        })
  }

  getRegions(): void {
    this.regionService
        .getRegions()
        .then(region => 
        {
          this.regions = region
          this.selectedRegion = this.regions[0];
        })
  }

  onSubmit(place: Place, form: NgForm) {
    console.log(place);
    this.place=place;
    this.place.Region_Id=this.selectedRegion.Id;    
    console.log(this.place);
    this.save();
    form.reset();       
  }  

  save(): void {
    this.placeService.create(this.place);
  }

  private logDropdown(id: number): void {  
      for(let i=0; i<this.regions.length; i++)
      {
        if(this.regions[i].Id == id)
        {
          this.selectedRegion=this.regions[i];
          console.log(this.selectedRegion);
          break;
        }
      }
    }   

}