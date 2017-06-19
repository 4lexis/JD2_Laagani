import { Component, OnInit, Output } from '@angular/core';
import { Accommodation } from '../model/accommodation';
import { AccommodationService } from '../services/accommodation-service.component';

@Component({
  selector: 'app-global-map',
  templateUrl: './global-map.component.html',
  styles: ['agm-map {height: 500px; width: 500px;}']
})
export class GlobalMapComponent implements OnInit {
    
    lat: number = 45.264088;
    lng: number = 19.830504;
    accommodations: Accommodation[];

  constructor(private accService: AccommodationService){}

  ngOnInit() {
      this.getAccommodations();      
  }

  getAccommodations(): void {
    this.accService
      .getAccommodations()
      .then(acctypes => this.accommodations = acctypes)
  }
}