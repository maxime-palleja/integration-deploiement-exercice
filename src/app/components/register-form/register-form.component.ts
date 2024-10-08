import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  registerForm: FormGroup;

  constructor(private form: FormBuilder) {
    this.registerForm = this.form.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z \'-àâäéèêëïîôöùûüç]*')]],
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z \'-àâäéèêëïîôöùûüç]*')]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z \'-àâäéèêëïîôöùûüç]*')]],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]]
    });

    this.registerForm.get('birthday')?.valueChanges.subscribe(date => {
      if (this.calculateAge(date) < 18) {
        this.registerForm.get('birthday')?.setErrors({tooYoung: true});
      }
    });
  }

  public calculateAge(date: Date): number {
    const birthDate = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  public onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form OK', this.registerForm.value);
      this.registerForm.reset();
    }
  }
}
