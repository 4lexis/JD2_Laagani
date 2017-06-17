import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styles: ['agm-map {height: 500px; width: 500px;}']
})
export class MapComponent implements OnInit {

  lat: number = 45.264088;
  lng: number = 19.830504;
  @Output() clickedLat: number;
  @Output() clickedLong: number;
  constructor(){}

  ngOnInit() {
  }

  onClick(res:any){    
    this.clickedLat = res.coords.lat;
    this.clickedLong = res.coords.lng;
  }

}