import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedsService } from '../services/feed.service';

@Component({
  selector: 'Feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {
  feeds:Array<any>
  feedForm : FormGroup;
  message;
  messageClass;
  proccesing;

  constructor(private frmBuilder : FormBuilder, private fedSvc: FeedsService, private fedDataSvc: FeedsService) {
    this.buildForm();
   
   }

  ngOnInit() {
    this.fedDataSvc.getFeeds()
    .subscribe(res => this.feeds = res);
  }

  buildForm(){
    this.feedForm = this.frmBuilder.group({
      avatar : [null, Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500),
        this.validateAvatar
      ])],

      name : [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        this.validateName
      ])],

      message : [null, Validators.compose([
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(500),
        this.validateMessage
      ])]

    });
  }


  validateAvatar(controls){
    const regExp = new RegExp(/\.(gif|jpg|jpeg|tiff|png)$/i);
    if(regExp.test(controls.value)){
      return null;
    } else{
      return { 'validateAvatar' : true }
    }
  }


  validateName(controls){
    const regExp = new RegExp(/^[a-zA-Z\s\d\.]+$/i);
    if(regExp.test(controls.value)){
      return null;
    } else{
      return { 'validateName' : true}
    }
  }

  validateMessage(controls){
    const regExp = new RegExp(/^[a-zA-Z\s\d\.]+$/i);
    if(regExp.test(controls.value)){
      return null;
    } else{
      return { 'validateMessage' : true }
    }
  }

  feedUser(){
    const feed = {
      avatar : this.feedForm.get('avatar').value,
      name : this.feedForm.get('name').value,
      message : this.feedForm.get('message').value
    }
    this.fedSvc.postFeeds(feed).subscribe(data => {
      if(!data.success){
        this.messageClass = "alert alert-danger",
        this.message = data.message;
      } else{
        this.messageClass = "alert alert-success",
        this.message = data.message;
      }
    });
  }

  loadPage(): void{
    window.location.reload();
  }
  

}
