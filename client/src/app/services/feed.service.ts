import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()

export class FeedsService{
    result : any;
    domain : "http://localhost:8080";

    constructor(private http:Http){

       
    }
    postFeeds(feed){
        return this.http.post(this.domain + '/authentication2/feeds', feed).map(res => res.json());
    }

}