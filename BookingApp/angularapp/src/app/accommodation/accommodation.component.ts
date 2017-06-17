import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from '../model/accommodation';

import { NgForm } from '@angular/forms';
import { AccommodationService } from '../services/accommodation-service.component';
import { PlaceService } from '../services/place-service.component';
import { Place } from '../model/place';
import { AccommodationTypeService } from '../services/accommodation-type-service.component';
import { AccommodationType } from '../model/accommodation-type';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
})

export class AccommodationComponent implements OnInit {
  @Input() clickedLat: number;
  @Input() clickedLong: number;
  accommodations: Accommodation[];
  accommodation: Accommodation;

  places: Place[];
  selectedPlace: Place;

  accTypes: AccommodationType[];
  selectedAccType: AccommodationType;

  constructor(private accService: AccommodationService, private placeService: PlaceService, private accTypeService: AccommodationTypeService) {
  }

  ngOnInit() {
    this.getAccommodations();
    this.getPlaces();
    this.getAccTypes();
  }

  getPlaces(): void {
    this.placeService
      .getPlaces()
      .then(place => {
        this.places = place
        this.selectedPlace = this.places[0];
      })
  }

  getAccTypes(): void {
    this.accTypeService
      .getAccommodationTypes()
      .then(accTypes => {
        this.accTypes = accTypes
        this.selectedAccType = this.accTypes[0];
      })
  }

  getAccommodations(): void {
    this.accService
      .getAccommodations()
      .then(acctypes => this.accommodations = acctypes)
  }

  onSubmit(accommodation: Accommodation, form: NgForm) {
    accommodation.AccommodationType_Id = this.selectedAccType.Id;
    accommodation.Place_Id = this.selectedPlace.Id;
    //accommodation.AppUser_Id = iscitacemo iz storage    
    accommodation.Approved = false; //po defaultu nije approvano od strane admina
    accommodation.AverageGrade = 0; //nema avg grade dok se ne oceni    
    debugger
    if (form.valid) {
      console.log(accommodation);
      this.accommodation = accommodation;
      this.save();
      form.resetForm();
    }
  }

  save(): void {
    this.accService.create(this.accommodation).then(() => this.getAccommodations());
  }

  private dropDownPlace(id: number): void {  
      for(let i=0; i<this.places.length; i++)
      {
        if(this.places[i].Id == id)
        {
          this.selectedPlace=this.places[i];
          console.log(this.selectedPlace);
          break;
        }
      }
    }

  private dropDownAccType(id: number): void {  
      for(let i=0; i<this.accTypes.length; i++)
      {
        if(this.accTypes[i].Id == id)
        {
          this.selectedAccType=this.accTypes[i];
          console.log(this.selectedAccType);
          break;
        }
      }
    }

}