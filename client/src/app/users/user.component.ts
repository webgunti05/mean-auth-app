import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector : "Users",
    templateUrl : './user.component.html',
    styleUrls : ['./user.component.css']
})

export class UserComponent implements OnInit{
    users: Array<any>;
    constructor(private authDataSvc: AuthService){
      this.authDataSvc.getUsers()
      .subscribe(res => this.users = res);
    }
    

    ngOnInit() {
      
    }

    

}