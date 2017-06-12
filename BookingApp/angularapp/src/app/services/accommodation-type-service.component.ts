import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {AccommodationType} from '../model/accommodation-type';

@Injectable()
export class AccommodationTypeService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private accommodationTypeUrl = 'http://localhost:54042/api/AccommodationTypes';  // URL to web api

  constructor(private http: Http) { }

  getAccommodationTypes(): Promise<AccommodationType[]> {
    return this.http.get(this.accommodationTypeUrl)
               .toPromise()
               .then(response => response.json() as AccommodationType[])
               .catch(this.handleError);
  }

  getAccommodationType(id: number): Promise<AccommodationType> {
    const url = `${this.accommodationTypeUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as AccommodationType)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.accommodationTypeUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(accommodationType: AccommodationType): Promise<AccommodationType> {
    return this.http
      .post(this.accommodationTypeUrl, JSON.stringify(accommodationType), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as AccommodationType)
      .catch(this.handleError);
  }

  update(accommodationType: AccommodationType): Promise<AccommodationType> {
    const url = `${this.accommodationTypeUrl}/${accommodationType.Id}`;
    return this.http
      .put(url, JSON.stringify(accommodationType), {headers: this.headers})
      .toPromise()
      .then(() => accommodationType)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}