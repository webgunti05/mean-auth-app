import { Component, OnInit } from '@angular/core';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  siteName : String;
  navList : Array<any>
  constructor(private navSvc: NavService) { 
    this.siteName = "RegAuthen";
    this.navList = this.navSvc.getNavList();
  }

  ngOnInit() {
  }

}
