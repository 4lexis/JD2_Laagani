import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from '../model/accommodation';

import { NgForm } from '@angular/forms';
import { AccommodationService } from '../services/accommodation-service.component';
import { PlaceService } from '../services/place-service.component';
import { Place } from '../model/place';
import { AccommodationTypeService } from '../services/accommodation-type-service.component';
import { AccommodationType } from '../model/accommodation-type';
import { UserService } from '../auth-services/user-service';
import { AppUser } from '../model/app-user';

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

  outPlaces: [{ value: number, text: string }] = [{ value: 0, text: "" }];
  outAccTypes: [{ value: number, text: string }] = [{ value: 0, text: "" }];
  users: AppUser[];

  constructor(private accService: AccommodationService, private placeService: PlaceService, private accTypeService: AccommodationTypeService, private userService: UserService) {
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
        this.outPlaces.pop();
          for(let place in this.places)
          {            
            this.outPlaces.push({ value: this.places[place].Id, text: this.places[place].Name });
          }
      })
  }

  getAccTypes(): void {
    this.accTypeService
      .getAccommodationTypes()
      .then(accTypes => {
        this.accTypes = accTypes
        this.selectedAccType = this.accTypes[0];
        this.outAccTypes.pop();
          for(let accType in this.accTypes)
          {            
            this.outAccTypes.push({ value: this.accTypes[accType].Id, text: this.accTypes[accType].Name });
          }
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
    accommodation.AppUser_Id = localStorage.getItem("currentUser"); //iscitacemo iz storage    
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

  onEdit(acc: Accommodation):void
  {
    for(let place in this.places)
    {
      if(this.places[place].Id = acc.Place_Id)
      {
        acc.Place=this.places[place];
        break;
      }
    }

    for(let accType in this.accTypes)
    {
      if(this.accTypes[accType].Id = acc.AccommodationType_Id)
      {
        acc.AccommodationType=this.accTypes[accType];
        break;
      }
    }

    this.userService.getAll().map(users => this.users=users);
    for(let user in this.users)
    {
      if(this.users[user].Id = acc.AccommodationType_Id)
      {
        acc.AppUser=this.users[user];
        break;
      }
    }

    this.accService.update(acc).then( () => this.getAccommodations());
  }

   delte(acc: Accommodation): void
  {    
    this.accService.delete(acc.Id).then(()=>this.getAccommodations());
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