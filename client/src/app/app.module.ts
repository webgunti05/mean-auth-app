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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainpageComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path : '', redirectTo : 'Home', pathMatch : 'full'},
      { path : 'Home', component : MainpageComponent},
      { path : 'Register', component : RegisterComponent},
      { path : 'Users', component : UserComponent},
      { path : 'Login', component : LoginComponent}
    ])
  ],
  providers: [
    NavService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
