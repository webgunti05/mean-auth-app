import { Component, OnInit } from '@angular/core';
import { NavService } from '../services/nav.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  siteName : String;
  navList : Array<any>
  constructor(
    private navSvc: NavService,
     private authSvc : AuthService,
    private routeSvc : Router) 
    { 
    this.siteName = "RegAuthen";
    this.navList = this.navSvc.getNavList();
  }

  onLogoutClick(){
    this.authSvc.logout();
    this.routeSvc.navigate(['/']);
  }

  ngOnInit() {
  }

}
