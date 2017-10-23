import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector : "Users",
    templateUrl : './user.component.html',
    styleUrls : ['./user.component.css']
})

export class UserComponent implements OnInit{
    users: any = [];
    constructor(private authDataSvc: AuthService){
      
    }
    

    ngOnInit() {
        this.authDataSvc.getAllUsers()
        .subscribe(users => {
            this.users = users;
            console.log(this.users);
        });
    }

    

}