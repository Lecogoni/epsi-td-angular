import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import {NavbarComponent} from "./ldap-management/navbar/navbar.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {LoginComponent} from "./security/login/login.component";
import {MatButtonModule} from "@angular/material/button";


const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'', redirectTo: 'users/list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes), MatSidenavModule, MatIconModule, MatDividerModule, MatListModule, AsyncPipe, MatToolbarModule, NgIf, MatButtonModule],
    declarations: [
        NavbarComponent
    ],
    exports: [RouterModule, NavbarComponent]
})
export class AppRoutingModule { }
