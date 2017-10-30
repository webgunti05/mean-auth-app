import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  result:any;
  domain = "http://localhost:8080";
  constructor(private http:Http) { 

  }

  registerUser(user){
    return this.http.post(this.domain + '/authentication/register', user).map(res => res.json());

  }
 
  getUsers() {
    return this.http.get(this.domain + '/authentication/users')
      .map(result => this.result = result.json().data);
  }



}
