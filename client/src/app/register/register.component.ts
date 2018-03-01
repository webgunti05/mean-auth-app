import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'Register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm : FormGroup;
  message ;
  messageClass;
  proccesing;

  constructor( private formBuilder: FormBuilder, private authSvc: AuthService,
        private _routeSvc : Router)
        { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this.userForm = this.formBuilder.group({
      username : [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validateUsername
      ])],

      email : [null, Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      password : [null, Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validatePassword
      ])],
      confirm : [null, Validators.required]
     
    }, { validator : this.matchingPasswords('password', 'confirm')});
  }

  

  validateEmail(controls){
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(regExp.test(controls.value)){
      return null;
    } else{
      return { 'validateEmail' : true }
    }
  }

  validateUsername(controls){
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if(regExp.test(controls.value)){
      return null;
    } else{
      return { 'validateUsername' : true }
    }
  }

  validatePassword(controls){
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    if(regExp.test(controls.value)){
      return null;
    } else{
      return { 'validatePassword' : true }
    }
  }
  matchingPasswords(password, confirm){
    return (group : FormGroup) => {
      if(group.controls[password].value === group.controls[confirm].value){
        return null;
      } else{
        return { 'matchingPasswords' : true }
      }
    }
  }

  register(){
    const user = {
      username :this.userForm.get('username').value,
      email : this.userForm.get('email').value,
      password : this.userForm.get('password').value
  }
  this.authSvc.registerUser(user).subscribe(data => {
    if(!data.success){
      this.messageClass = "alert alert-danger";
      this.message = data.message;
    } else{
      this.messageClass = "alert alert-success";
      this.message = data.message;
      //this._routeSvc.navigateByUrl('/Login');
      setTimeout(() =>{
        this._routeSvc.navigateByUrl('/Login');
      },1000);
    }
  });
}


}
