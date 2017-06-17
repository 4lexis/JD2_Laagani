import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Room } from '../model/room';
import { Accommodation } from '../model/accommodation';
import { AccommodationService } from '../services/accommodation-service.component';
import { RoomService } from '../services/room-service.component';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html'
})
export class RoomComponent implements OnInit {
    public rooms: Array<Room> = new Array<Room>();
    error: string;
    room: Room = new Room();
    accommodations: Array<Accommodation> = new Array<Accommodation>();
    selectedAcc: Accommodation;


    constructor(private roomService: RoomService, private accService: AccommodationService) { }

    ngOnInit() {
        this.getRooms();
        this.getAccommodations();
    }

    getRooms(): void {

        this.roomService
            .getRooms()
            .then(rooms => {
                this.rooms = rooms;
                for (let ro in this.rooms) {
                    this.accService.getAccommodation(this.rooms[ro].Accommodation_Id).then(acc => this.rooms[ro].Accommodation = acc);

                }
            }
            );
    }

    getAccommodations(): void {
        this.accService
            .getAccommodations()
            .then(accs => {
                this.accommodations = accs
                this.selectedAcc = this.accommodations[0];
            })
    }

    onSubmit(room: Room, form: NgForm) {
        if (form.valid) {
            console.log(room);
            this.room = room;
            this.room.Accommodation_Id = this.selectedAcc.Id;
            console.log(this.room);
            this.save();
            form.reset();
        }
    }

    save(): void {
        this.roomService.create(this.room).then(() => this.getRooms());
    }

    private logDropdown(id: number): void {
        for (let i = 0; i < this.accommodations.length; i++) {
            if (this.accommodations[i].Id == id) {
                this.selectedAcc = this.accommodations[i];
                console.log(this.selectedAcc);
                break;
            }
        }
    }

}