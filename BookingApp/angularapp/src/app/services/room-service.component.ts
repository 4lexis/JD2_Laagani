import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Room } from '../model/room';


@Injectable()
export class RoomService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private roomUrl = 'http://localhost:54042/api/Rooms';  // URL to web api

  constructor(private http: Http) { }

  getRooms(): Promise<Room[]> {
    return this.http.get(this.roomUrl)
               .toPromise()
               .then(response => response.json() as Room[])
               .catch(this.handleError);
  }

  getRoom(id: number): Promise<Room> {
    const url = `${this.roomUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Room)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.roomUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(room: Room): Promise<Room> {
    return this.http
      .post(this.roomUrl, JSON.stringify(room), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Room)
      .catch(this.handleError);      
  }

  update(room: Room): Promise<Room> {
    const url = `${this.roomUrl}/${room.Id}`;
    return this.http
      .put(url, JSON.stringify(room), {headers: this.headers})
      .toPromise()
      .then(() => room)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}