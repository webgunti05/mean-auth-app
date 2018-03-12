import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  result:any;
  domain = "http://localhost:8080";
  authToken;
  user;
  options;
  constructor(private http:Http) { 

  }

  createAuthenticationHeaders() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', 
        'authorization': this.authToken
      })
    });
  }

  loadToken() {
    this.authToken = localStorage.getItem('token');
  }


  registerUser(user){
    return this.http.post(this.domain + '/authentication/register', user).map(res => res.json());

  }
 
  getUsers() {
    return this.http.get(this.domain + '/authentication/users')
      .map(result => this.result = result.json().data);
  }

  checkUsername(username){
    return this.http.get(this.domain + '/authentication/checkUsername/' + username).map(res => res.json());
  }

  login(user){
    return this.http.post(this.domain + '/authentication/login', user).map(res => res.json());
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

storeUserData(token, user){
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user))
  this.authToken = token;
  this.user = user;
}

loggedIn(){
  return tokenNotExpired();
}

}
