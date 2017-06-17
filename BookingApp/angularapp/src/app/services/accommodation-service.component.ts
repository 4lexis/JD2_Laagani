import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Accommodation} from '../model/accommodation';

@Injectable()
export class AccommodationService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private accommodationUrl = 'http://localhost:54042/api/Accommodations';  // URL to web api

  constructor(private http: Http) { }

  getAccommodations(): Promise<Accommodation[]> {
    return this.http.get(this.accommodationUrl)
               .toPromise()
               .then(response => response.json() as Accommodation[])
               .catch(this.handleError);
  }

  getAccommodation(id: number): Promise<Accommodation> {
    const url = `${this.accommodationUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Accommodation)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.accommodationUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(accommodation: Accommodation): Promise<Accommodation> {
    return this.http
      .post(this.accommodationUrl, JSON.stringify(accommodation), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Accommodation)
      .catch(this.handleError);
  }

  update(accommodation: Accommodation): Promise<Accommodation> {
    const url = `${this.accommodationUrl}/${accommodation.Id}`;
    return this.http
      .put(url, JSON.stringify(accommodation), {headers: this.headers})
      .toPromise()
      .then(() => accommodation)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);    
    return Promise.reject(error.message || error);
  }

}