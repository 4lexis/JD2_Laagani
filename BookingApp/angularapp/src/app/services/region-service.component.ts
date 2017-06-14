import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Region} from '../model/region';

@Injectable()
export class RegionService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private regionUrl = 'http://localhost:54042/api/Regions';  // URL to web api

  constructor(private http: Http) { }

  getRegions(): Promise<Region[]> {
    return this.http.get(this.regionUrl)
               .toPromise()
               .then(response => response.json() as Region[])
               .catch(this.handleError);
  }

  getRegion(id: number): Promise<Region> {
    const url = `${this.regionUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Region)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.regionUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(region: Region): Promise<Region> {
    return this.http
      .post(this.regionUrl, JSON.stringify(region), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Region)
      .catch(this.handleError);      
  }

  update(region: Region): Promise<Region> {
    const url = `${this.regionUrl}/${region.Id}`;
    return this.http
      .put(url, JSON.stringify(region), {headers: this.headers})
      .toPromise()
      .then(() => region)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}