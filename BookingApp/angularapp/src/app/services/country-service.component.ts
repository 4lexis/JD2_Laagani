import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Country } from '../model/country';

@Injectable()
export class CountryService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private countryUrl = 'http://localhost:54042/api/Countries';  // URL to web api

  constructor(private http: Http) { }

  getCountries(): Promise<Country[]> {
    return this.http.get(this.countryUrl)
      .toPromise()
      .then(response => response.json() as Country[])
      .catch(this.handleError);
  }

  getCountry(id: number): Promise<Country> {
    const url = `${this.countryUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Country)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.countryUrl}/${id}`;
    return this.http.delete(url, this.jwt())
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(country: Country): Promise<Country> {
    return this.http
      .post(this.countryUrl, JSON.stringify(country), this.jwt())
      .toPromise()
      .then((res => res.json() as Country))
      .catch(this.handleError);
  }

  update(country: Country): Promise<Country> {
    const url = `${this.countryUrl}/${country.Id}`;
    return this.http
      .put(url, JSON.stringify(country), this.jwt())
      .toPromise()
      .then(() => country)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private jwt() {
    // create authorization header with jwt token
    let currentUser = localStorage.getItem('currentUser');
    let token = localStorage.getItem('id_token');
    let headers = new Headers({ 'Content-Type': 'application/json' });

    //console.log("currentUser: " + currentUser);
    //console.log("token: " + token);

    if (currentUser && token) {
      headers.append('Authorization', 'Bearer ' + token);
      return new RequestOptions({ headers: headers });
    }
  }
}