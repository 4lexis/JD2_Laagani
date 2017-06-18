import { Component, OnInit, Input } from '@angular/core';
import { Accommodation } from '../model/accommodation';


import { NgForm } from '@angular/forms';
import { AccommodationService } from '../services/accommodation-service.component';
import { PlaceService } from '../services/place-service.component';
import { Place } from '../model/place';
import { AccommodationTypeService } from '../services/accommodation-type-service.component';
import { AccommodationType } from '../model/accommodation-type';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Room } from '../model/room';

@Component({
	selector: 'app-accommodation-details',
	templateUrl: './accommodation-details.component.html',
	styleUrls: ["./accommodation-details.css"]
})

export class AccommodationDetailsComponent implements OnInit {

	id: number;
	acc: Accommodation;
	rooms: Room[];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private service: AccommodationService) { }

	ngOnInit() {
		this.id = this.route.snapshot.params['id'];
		this.getAccommodation();
		this.getRooms();


	}

	getAccommodation() {
		this.service
			.getAccommodation(this.id)
			.then(acc => this.acc = acc);
	}

	getRooms(): void {
		this.service
			.getRoomsOfAccommodation(this.id)
			.then(rooms => this.rooms = rooms)
	}



}