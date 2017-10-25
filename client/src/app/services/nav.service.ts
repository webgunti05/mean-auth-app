import { Injectable } from '@angular/core';
@Injectable()

export class NavService{

    private navList : Array<any>
    constructor(){
        this.navList = ["Home", "Users", "Feeds", "Register", "Login"];
    }

    getNavList(){
        return this.navList;
    }


}