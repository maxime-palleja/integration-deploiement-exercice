import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  registerForm: FormGroup;

  constructor(private form: FormBuilder, private toastr: ToastrService) {
    this.registerForm = this.form.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z \'-àâäéèêëïîôöùûüç]*')]],
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z \'-àâäéèêëïîôöùûüç]*')]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', [Validators.required, this.validateAge]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z \'-àâäéèêëïîôöùûüç]*')]],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]]
    });
  }
  validateAge(control: any) {
    console.log(control.value);
    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      return { minAge: true };
    }
    return null;
  }
  public onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form OK', this.registerForm.value);
      this.registerForm.reset();
      this.toastr.success('Registration successful!', 'Success');
    }
  }

  get name() { return this.registerForm.get('name'); }
  get firstname() { return this.registerForm.get('firstname'); }
  get email() { return this.registerForm.get('email'); }
  get birthday() { return this.registerForm.get('birthday'); }
  get city() { return this.registerForm.get('city'); }
  get postalCode() { return this.registerForm.get('postalCode'); }


}
