import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { Accommodation } from '../model/accommodation';
import { AccommodationService } from '../services/accommodation-service.component';
import { PlaceService } from '../services/place-service.component';
import { Place } from '../model/place';
import { AccommodationTypeService } from '../services/accommodation-type-service.component';
import { AccommodationType } from '../model/accommodation-type';
import { Room } from '../model/room';

@Component({
	selector: 'app-accommodation-details',
	templateUrl: './accommodation-details.component.html',
	styleUrls: [
		"./accommodation-details.css",
		"../forms.css"
		]
})

export class AccommodationDetailsComponent implements OnInit {

	model: any = {};
	id: number;
	acc: Accommodation;
	rooms: Room[];
	currentRole: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private accService: AccommodationService) { }

	ngOnInit() {
		this.id = this.route.snapshot.params['id'];
		this.getAccommodation();
		this.getRooms();
		this.currentRole = localStorage.getItem("currentRole");
	}

	getAccommodation() {
		this.accService
			.getAccommodation(this.id)
			.then(acc => this.acc = acc);
	}

	getRooms(): void {
		this.accService
			.getRoomsOfAccommodation(this.id)
			.then(rooms => this.rooms = rooms)
	}


	createNew(acc: Accommodation, form: NgForm) {
		this.accService
			.create(acc)
			.then(() => alert("dodato"));
	}
}