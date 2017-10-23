import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {

    domain = "http://localhost:8080";
  constructor(private http:Http) { 

  }

  registerUser(user){
    return this.http.post(this.domain + '/authentication/register', user).map(res => res.json());

  }
  getAllUsers(){
    return this.http.get(this.domain + '/authentication/register/users')
    .map(res => res.json());

  }

 

}
