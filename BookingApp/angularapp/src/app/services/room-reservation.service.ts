import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { RoomReservation } from '../model/room-reservation';

@Injectable()
export class RoomReservationService {

    url = "http://localhost:54042/api/RoomReservations/";

    constructor(private http: Http) { }

    getAll() {
        return this.http.get(this.url).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.url + id).map((response: Response) => response.json());
    }

    post(res: RoomReservation) {
        return this.http.post(this.url, res).map((response: Response) => response.json());
    }

    update(res: RoomReservation) {
        return this.http.put(this.url + res.Id, res).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.url + id).map((response: Response) => response.json());
    }
}