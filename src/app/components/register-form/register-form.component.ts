import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {User} from "../../interfaces/user";
import {environment} from "../../environment/environment";

/**
 * Composant pour le formulaire d'inscription.
 * Permet de créer un nouveau formulaire d'inscription avec des validations de base
 * et affiche un message de succès en cas de soumission réussie.
 */
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  /**
   * Formulaire de création d'utilisateur
   * @type {FormGroup}
   */
  registerForm: FormGroup;

  /**
   * Événement émis lorsqu'un utilisateur est ajouté.
   * @type {EventEmitter<any>}
   */
  @Output() userAdded: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Constructeur du composant.
   * Initialise le formulaire avec les validations nécessaires.
   *
   * @param {FormBuilder} form - Injecte le service de création de formulaires.
   * @param {ToastrService} toastr - Injecte le service Toastr pour afficher des notifications.
   */
  constructor(private form: FormBuilder, private toastr: ToastrService, private httpClient: HttpClient) {
    this.registerForm = this.form.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
      firstname: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', [Validators.required, this.checkBirthday]],
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s-]+$/)]],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]]
    });
  }

  /**
   * Valide si l'utilisateur est majeur.
   *
   * @param {any} control - Contrôle du formulaire à valider.
   * @returns {null | Object} - Retourne une erreur `minAge` si l'utilisateur a moins de 18 ans, sinon `null`.
   */
  checkBirthday(control: any): any {
    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      return {minAge: true};
    }
    return null;
  }

  /**
   * Soumet le formulaire s'il est valide et affiche un message de succès.
   * Réinitialise le formulaire après une soumission réussie.
   */
  public onSubmit(): void {
    if (this.registerForm.valid) {
      this.addUser(this.registerForm.value);
      this.userAdded.emit("OK")
      this.registerForm.reset();
      this.toastr.success('Registration successful!', 'Success');
    }
  }

  // Getters pour accéder facilement aux contrôles du formulaire.

  /** @returns {AbstractControl | null} - Retourne le contrôle du champ 'name'. */
  get name() {
    return this.registerForm.get('name');
  }

  /** @returns {AbstractControl | null} - Retourne le contrôle du champ 'firstname'. */
  get firstname() {
    return this.registerForm.get('firstname');
  }

  /** @returns {AbstractControl | null} - Retourne le contrôle du champ 'email'. */
  get email() {
    return this.registerForm.get('email');
  }

  /** @returns {AbstractControl | null} - Retourne le contrôle du champ 'birthday'. */
  get birthday() {
    return this.registerForm.get('birthday');
  }

  /** @returns {AbstractControl | null} - Retourne le contrôle du champ 'city'. */
  get city() {
    return this.registerForm.get('city');
  }

  /** @returns {AbstractControl | null} - Retourne le contrôle du champ 'postalCode'. */
  get postalCode() {
    return this.registerForm.get('postalCode');
  }

  /**
   * Ajoute un utilisateur à la base de données.
   * @param user
   * @returns {void}
   */
  addUser(user: User): void {
    this.httpClient.post<User>(environment.apiUrl, user).subscribe(user => {
      this.userAdded.emit('userAdded');
    });
  }
}
