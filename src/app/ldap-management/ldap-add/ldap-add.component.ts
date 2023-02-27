import {Component, OnInit, ViewChild} from '@angular/core';
import {LdapDetailComponent} from "../ldap-detail/ldap-detail.component";
import {UsersService} from "../../service/users.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";



@Component({
  selector: 'app-ldap-edit',
  templateUrl: '../ldap-detail/ldap-detail.component.html',
  styleUrls: ['../ldap-detail/ldap-detail.component.css']
})
export class LdapAddComponent extends LdapDetailComponent implements OnInit{


  constructor(private usersService : UsersService,
              fb: FormBuilder,
              private route : ActivatedRoute,
              router: Router,
              private snackBar : MatSnackBar) {
    super(true,fb,router);
  }

  ngOnInit(): void {
    super.onInit();
  }

  validateForm() : void {
    console.log('LdapAddComponent - validateForm');
    this.processValidateRunning = true;
    this.usersService.addUser(this.getUserFromFormControl()).subscribe(
      data => {
        this.processValidateRunning = false;
        this.errorMessage = '';
        this.snackBar.open('Utilisateur ajouté !', 'X');
        this.router.navigate(['/users/list']);
      },
      error => {
        this.processLoadRunning = false;
        this.errorMessage = 'L\'utilisateur n\'a pas pu etre ajouté !';
        this.snackBar.open('Erreur dans l\'ajout de l\'utilisateur!', 'X');
      }
    );
   }


  deleteUser():void {
    const login = this.route.snapshot.paramMap.get('id');

    this.processLoadRunning = true;

    this.usersService.deleteUser(Number(login));

  }

}
