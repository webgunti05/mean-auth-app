import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavService } from './services/nav.service';
import { AuthService } from './services/auth.service';
import { UserComponent } from './users/user.component';
import { FeedsComponent } from './feeds/feeds.component';
import { FeedsService } from './services/feed.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainpageComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    FeedsComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path : '', redirectTo : 'Login', pathMatch : 'full'},
      { path : 'Home', component : MainpageComponent},
      { path : 'Register', component : RegisterComponent},
      { path : 'Feeds', component : FeedsComponent},
      { path : 'Users', component : UserComponent},
      { path : 'Login', component : LoginComponent}
    ])
  ],
  providers: [
    NavService,
    AuthService,
    FeedsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
