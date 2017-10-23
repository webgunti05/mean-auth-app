import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'Register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm : FormGroup;

  constructor( private formBuilder: FormBuilder) { 
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
     
    }, { Validator : this.matchingPasswords('password', 'confirm')});
  }

  

  validateEmail(controls){
    const regExp = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
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
    const regExp = new RegExp(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/);
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
    console.log(this.userForm);
  }

}
