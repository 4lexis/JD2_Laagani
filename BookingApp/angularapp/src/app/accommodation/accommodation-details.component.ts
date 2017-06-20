import { Component, OnInit, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Accommodation } from '../model/accommodation';
import { AccommodationService } from '../services/accommodation-service.component';
import { PlaceService } from '../services/place-service.component';
import { Place } from '../model/place';
import { Comment } from '../model/comment';
import { AccommodationTypeService } from '../services/accommodation-type-service.component';
import { AccommodationType } from '../model/accommodation-type';
import { Room } from '../model/room';
import { RoomReservationComponent } from '../room-reservation/room-reservation.component';
import { RoomReservation } from '../model/room-reservation';
import { AlertService } from '../auth-services/alert-service';

import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { RoomReservationService } from '../services/room-reservation.service';
import { CommentComponent } from '../comment/comment.component';
import { CommentService } from '../services/comment-service.component';

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
    acc: Accommodation = new Accommodation();
    rooms: Room[];
    currentRole: string;
    currentUser: string;
    roomId: number;
    reservation: RoomReservation;

    startDate: Date;
    endDate: Date;

    @Input() comment: CommentComponent;

    private myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private accService: AccommodationService,
        private alertService: AlertService,
        private roomResService: RoomReservationService,
        private commentService: CommentService) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.getAccommodation();
        this.getRooms();
        this.currentRole = localStorage.getItem("currentRole");
        this.currentUser = localStorage.getItem("currentUser");
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

    onDateChanged(event: IMyDateModel, component: number) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
        if (component == 1) {
            this.startDate = event.jsdate;
        } else {
            this.endDate = event.jsdate;
        }
    }


    getRoom(id: number) {
        this.roomId = id;
    }

    onReservation(form: NgForm) {
        if (form.valid) {
            var res = new RoomReservation();

            res.AppUser_Id = this.currentUser;
            res.Room_Id = this.roomId;
            res.StartDate = this.startDate;
            res.EndDate = this.endDate;
            res.Timestamp = new Date();

            console.log("new reservation: " + JSON.stringify(res));
            this.roomResService.post(res)
                .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Reservation posted successfully', true);
                },
                error => {
                    this.alertService.error(error);
                });


            form.reset();
        } else {
            this.alertService.error("Form is not valid");
        }
    }

    submitComment(comm: Comment, form: NgForm) {
        console.log("new comment: " + JSON.stringify(comm));

        comm.Accommodation_Id = this.id;
        comm.AppUser_Id = this.currentUser;
        this.commentService.post(comm)
            .subscribe(
            data => {
                // set success message and pass true paramater to persist the message after redirecting to the login page
                this.alertService.success('Comment posted successfully', true);
            },
            error => {
                this.alertService.error(error);
            });
        form.reset();

    }
}