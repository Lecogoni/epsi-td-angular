import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';;
import { LdapManagementModule } from './ldap-management/ldap-management.module';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryUsersService} from "./service/in-memory-users.service";
import { LoginComponent } from './security/login/login.component';
import {MatCardModule} from "@angular/material/card";
import {UsersService} from "./service/users.service";



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    LdapManagementModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryUsersService, {dataEncapsulation: false}
    ),
    MatCardModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
