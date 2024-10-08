import { ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {render, screen, fireEvent} from '@testing-library/angular';
import {RegisterFormComponent} from './register-form.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('RegisterFormComponent', () => {
  beforeEach(async () => {
    await render(RegisterFormComponent, {
      imports: [ReactiveFormsModule, ToastrModule.forRoot(), BrowserAnimationsModule,],
    });
  });

  it('should render the form fields', () => {
    expect(screen.getByLabelText('Name :')).toBeTruthy();
    expect(screen.getByLabelText('First Name :')).toBeTruthy();
    expect(screen.getByLabelText('Email :')).toBeTruthy();
    expect(screen.getByLabelText('Date of Birth :')).toBeTruthy();
    expect(screen.getByLabelText('City :')).toBeTruthy();
    expect(screen.getByLabelText('Postal Code :')).toBeTruthy();
  });

  it('should disable the submit button if the form is invalid', () => {
    const submitButton = screen.getByRole('button', { name: /Register/i });
    expect(submitButton.hasAttribute('disabled')).toBe(true);
  });

  it('should show error messages when fields are touched but empty', async () => {
    const nomInput = screen.getByLabelText('Name :');
    fireEvent.blur(nomInput);

    expect(await screen.findByText('Name is required.')).toBeTruthy();
  });

  it('should enable the submit button when the form is valid', async () => {
    fireEvent.input(screen.getByLabelText('Name :'), { target: { value: 'Dupont' } });
    fireEvent.input(screen.getByLabelText('First Name :'), { target: { value: 'Jean' } });
    fireEvent.input(screen.getByLabelText('Email :'), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.input(screen.getByLabelText('Date of Birth :'), { target: { value: '2000-01-01' } });
    fireEvent.input(screen.getByLabelText('City :'), { target: { value: 'Paris' } });
    fireEvent.input(screen.getByLabelText('Postal Code :'), { target: { value: '75001' } });

    const submitButton = screen.getByRole('button', { name: /Register/i });
    expect(submitButton.hasAttribute('disabled')).toBe(false);
  });

  it('should show an error message when the age is less than 18', async () => {
    fireEvent.input(screen.getByLabelText('Name :'), { target: { value: 'Dupont' } });
    fireEvent.input(screen.getByLabelText('First Name :'), { target: { value: 'Jean' } });
    fireEvent.input(screen.getByLabelText('Email :'), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.input(screen.getByLabelText('Date of Birth :'), { target: { value: '2010-01-01' } });
    fireEvent.input(screen.getByLabelText('City :'), { target: { value: 'Paris' } });
    fireEvent.input(screen.getByLabelText('Postal Code :'), { target: { value: '75001' } });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    const errorMessage = await screen.findByText('You must be at least 18 years old.');
    expect(errorMessage).toBeTruthy();
  });

  it('should show a success toaster message on form submission', async () => {
    fireEvent.input(screen.getByLabelText('Name :'), { target: { value: 'Dupont' } });
    fireEvent.input(screen.getByLabelText('First Name :'), { target: { value: 'Jean' } });
    fireEvent.input(screen.getByLabelText('Email :'), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.input(screen.getByLabelText('Date of Birth :'), { target: { value: '2000-01-01' } });
    fireEvent.input(screen.getByLabelText('City :'), { target: { value: 'Paris' } });
    fireEvent.input(screen.getByLabelText('Postal Code :'), { target: { value: '75001' } });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    const toasterMessage = await screen.findByText('Registration successful!');
    expect(toasterMessage).toBeTruthy();
  });
});
