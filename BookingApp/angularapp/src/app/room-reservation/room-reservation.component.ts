import { Component, OnInit } from '@angular/core';
import { Comment } from '../model/comment';
import { AlertService } from '../auth-services/index';
import { NgForm } from '@angular/forms';
import { InlineEditorComponent } from 'ng2-inline-editor';
import { RoomReservationService } from "../services/room-reservation.service";
import { RoomReservation } from "../model/room-reservation";

@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html'
})

export class RoomReservationComponent implements OnInit {

  model: any = {};
  reservations: Array<RoomReservation>;
  isVisible: boolean = false;

  constructor(
    private roomReservation: RoomReservationService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.getReservations();
  }

  getReservations() {
    this.roomReservation
      .getAll()
      .subscribe(reservations => {
        this.reservations = reservations;
      })
  }

  onSave(res: RoomReservation) {
    console.log("editing reservation: " + JSON.stringify(res));
    this.roomReservation.update(res)
      .subscribe(
      data => {
        // set success message and pass true paramater to persist the message after redirecting to the login page
        this.alertService.success('Reservation edited successfully', true);
      },
      error => {
        this.alertService.error(error);
      });
  }


  onReservation(res: RoomReservation) {
    console.log("new reservation: " + JSON.stringify(res));
    this.roomReservation.post(res)
      .subscribe(
      data => {
        // set success message and pass true paramater to persist the message after redirecting to the login page
        this.alertService.success('Reservation posted successfully', true);
      },
      error => {
        this.alertService.error(error);
      });
    this.isVisible = false;
  }

  removeReservation(res: RoomReservation) {
    console.log("removing reservation: " + JSON.stringify(res));
    this.roomReservation.delete(res.Id)
      .subscribe(
      data => {
        // set success message and pass true paramater to persist the message after redirecting to the login page
        this.alertService.success('Reservation removed successfully', true);
      },
      error => {
        this.alertService.error(error);
      });
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }


}