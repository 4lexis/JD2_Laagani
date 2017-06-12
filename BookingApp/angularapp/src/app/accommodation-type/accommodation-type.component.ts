import { Component, OnInit } from '@angular/core';
import { AccommodationType} from '../model/accommodation-type';
import { AccommodationTypeService }  from '../services/accommodation-type-service.component';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-accommodation-type',
  templateUrl: './accommodation-type.component.html'
})
export class AccommodationTypeComponent implements OnInit {

  accommodationTypes:AccommodationType[];
  error:string;
  accommodationType:AccommodationType;

  constructor(private accTypeService: AccommodationTypeService) { }

  ngOnInit() 
  {
    this.getAccommodationTypes();
  }

  getAccommodationTypes(): void {
    this.accTypeService
        .getAccommodationTypes()
        .then(acctypes => this.accommodationTypes = acctypes)        
  }

  onSubmit(accommodationType: AccommodationType, form: NgForm) {
    console.log(accommodationType);
    this.accommodationType=accommodationType;
    this.save();
    form.reset();    
  }

  save(): void {
    this.accTypeService.create(this.accommodationType);    
  }

}