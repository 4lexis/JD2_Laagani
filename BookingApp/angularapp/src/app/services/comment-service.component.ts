import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Comment } from '../model/comment';

@Injectable()
export class CommentService {

    url = "http://localhost:54042/api/Comments/";

    constructor(private http: Http) { }

    getAll() {
        return this.http.get(this.url).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.url + id).map((response: Response) => response.json());
    }

    post(comm: Comment) {
        return this.http.post(this.url, comm).map((response: Response) => response.json());
    }

    update(comm: Comment) {
        return this.http.put(this.url + comm.Id, comm).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.url + id).map((response: Response) => response.json());
    }
}