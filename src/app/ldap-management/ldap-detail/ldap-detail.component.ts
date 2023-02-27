import { Router } from '@angular/router';

import { UserLdap } from '../../model/user-ldap';

import { FormBuilder } from '@angular/forms';
import {ConfirmValidParentMatcher, passwordValidator} from "./passwords-validator.directive";
import {LDAP_USERS} from "../../model/ldap-mock-data";


export abstract class LdapDetailComponent {

  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  user: UserLdap;
  newId = 0;
  processLoadRunning = false;
  processValidateRunning = false;
  passwordPlaceHolder: string;
  errorMessage = '';

  userForm = this.fb.group({
    login: [''],
    nom: [''],
    prenom: [''],

    passwordGroup: this.fb.group({
      password: [''],
      confirmPassword: ['']
    }, {validators: passwordValidator}),
    mail: {value: '', disabled: true},

  });

  protected constructor(
    public addForm: boolean,
    /* protected route: ActivatedRoute, */
    private fb: FormBuilder,
    public router: Router,
  ) {
    this.passwordPlaceHolder = 'Mot de passe' + (this.addForm ? '' : ' (vide si inchangé)');
  }

  protected onInit(): void {

  }


  private formGetValue(name: string): any {
    return this.userForm.get(name).value;
  }

  goToLdap(): void {
    this.router.navigate(['/users/list']);
  }

  abstract validateForm(): void;

  abstract deleteUser(): void;

  onSubmitForm(): void {
    this.validateForm();
  }

  delete(): void {
    this.deleteUser();
  }

  updateLogin(): void {
    if (this.addForm) {
      this.userForm.get('login').setValue((this.formGetValue('prenom')
        + '.' + this.formGetValue('nom')).toLowerCase());
      this.updateMail();
    }
  }

  updateMail(): void {
    if (this.addForm) {
      this.userForm.get('mail').setValue(this.formGetValue('login').toLowerCase() + '@epsi.lan')
    }
  }

  isFormValid(): boolean {
    return this.userForm.valid

      && (!this.addForm || this.formGetValue('passwordGroup.password') !== '');
  }

  public copyUserToFormControl(): void {
    this.userForm.get('login').setValue(this.user.login);
    this.userForm.get('nom').setValue(this.user.nom);
    this.userForm.get('prenom').setValue(this.user.prenom);
    this.userForm.get('mail').setValue(this.user.mail);

    /*
    this.userForm.get('employeNumero').setValue(this.user.employeNumero);
    this.userForm.get('employeNiveau').setValue(this.user.employeNiveau);
    this.userForm.get('dateEmbauche').setValue(this.user.dateEmbauche);
    this.userForm.get('publisherId').setValue(this.user.publisherId);
    this.userForm.get('active').setValue(this.user.active);
    */
  }

  protected getUserFromFormControl(): UserLdap {
    if (!this.addForm) {
      return  {
        id: this.user.id,
        login: this.userForm.get('login').value,
        nom: this.userForm.get('nom').value,
        prenom: this.userForm.get('prenom').value,
        nomComplet: this.userForm.get('nom').value + ' ' + this.userForm.get('prenom').value,
        mail: this.userForm.get('mail').value,
        //Les valeurs suivantes devraient etre reprise du formulaire
        employeNumero: 1,
        employeNiveau: 1,
        dateEmbauche: '2020-04-24',
        publisherId: this.user.id,
        active: true,
        motDePasse: '',
        role: 'ROLE_USER'
      };
    }
    for (let i=0;i<=LDAP_USERS.length;i++)
      this.newId=i;
    return {
      id: this.newId+1,
      login: this.userForm.get('login').value,
      nom: this.userForm.get('nom').value,
      prenom: this.userForm.get('prenom').value,
      nomComplet: this.userForm.get('nom').value + ' ' + this.userForm.get('prenom').value,
      mail: this.userForm.get('mail').value,
      //Les valeurs suivantes devraient etre reprise du formulaire
      employeNumero: 1,
      employeNiveau: 1,
      dateEmbauche: '2020-04-24',
      publisherId: this.newId+1,
      active: true,
      motDePasse: '',
      role: 'ROLE_USER'
    };
  }
}
