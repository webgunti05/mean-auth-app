import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'Home',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  homeBG : String;
  constructor() { 
    this.homeBG = "assets/ang-bg2.png"
  }

  ngOnInit() {
  }

}
