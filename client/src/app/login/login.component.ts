import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  messageClass;
  message;
  processing = false;
  loginForm : FormGroup;

  constructor(
    private frmBulider : FormBuilder,
    private authSvc : AuthService,
    private _router : Router
  ) { 
    this.creatLoginForm();

  }

  creatLoginForm(){
    this.loginForm = this.frmBulider.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  disableForm(){
    this.loginForm.controls['username'].disable();
    this.loginForm.controls['password'].disable();
  }

  enableForm(){
    this.loginForm.controls['username'].enable();
    this.loginForm.controls['password'].enable();
  }

  onLoginSubmit(){
    this.processing = true;
    this.disableForm();
    const user = {
      username : this.loginForm.get('username').value,
      password : this.loginForm.get('password').value
    }
    this.authSvc.login(user).subscribe(data =>{
      if(!data.success){
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else{
        this.messageClass = "alert alert-success";
        this.message = data.message;
        this.authSvc.storeUserData(data.token, data.user);
        setTimeout(() => {
          this._router.navigateByUrl('/Home');
        },2000);
      }
    })
  }

  ngOnInit() {
  }

}
