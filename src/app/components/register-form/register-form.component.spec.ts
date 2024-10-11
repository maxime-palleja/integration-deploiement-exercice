import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {render, screen, fireEvent} from '@testing-library/angular';
import {RegisterFormComponent} from './register-form.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('RegisterFormComponent', () => {
  beforeEach(async () => {
    await render(RegisterFormComponent, {
      imports: [ReactiveFormsModule, ToastrModule.forRoot(), BrowserAnimationsModule, HttpClientModule],
    });
  });


  /**
   * Test to verify if the form fields are rendered correctly.
   */
  it('should render the form fields', () => {
    expect(screen.getByLabelText('Name :')).toBeTruthy();
    expect(screen.getByLabelText('First Name :')).toBeTruthy();
    expect(screen.getByLabelText('Email :')).toBeTruthy();
    expect(screen.getByLabelText('Date of Birth :')).toBeTruthy();
    expect(screen.getByLabelText('City :')).toBeTruthy();
    expect(screen.getByLabelText('Postal Code :')).toBeTruthy();
  });

  /**
   * Test to ensure the submit button is disabled when the form is invalid.
   */
  it('should disable the submit button if the form is invalid', () => {
    const submitButton = screen.getByRole('button', { name: /Register/i });
    expect(submitButton.hasAttribute('disabled')).toBe(true);
  });

  /**
   * Test to verify error messages are shown when fields are touched but left empty or invalid.
   */
  it('should show error message when field Name are touched but empty', async () => {
    const input = screen.getByLabelText('Name :');
    fireEvent.blur(input);
    expect(await screen.findByText('Name is required.')).toBeTruthy();
  });
  it('should show error message when Name is touched but contains numbers', async () => {
    const nameInput = screen.getByLabelText('Name :');
    fireEvent.input(nameInput, { target: { value: '151452' } });
    fireEvent.blur(nameInput);
    expect(await screen.findByText('The name must not contain numbers or special characters.')).toBeTruthy();
  });
  it('should show error message when field First Name are touched but empty', async () => {
    const input = screen.getByLabelText('First Name :');
    fireEvent.blur(input);
    expect(await screen.findByText('First name is required.')).toBeTruthy();
  });
  it('should show error message when First Name is touched but contains numbers', async () => {
    const firstnameInput = screen.getByLabelText('First Name :');
    fireEvent.input(firstnameInput, { target: { value: '151452' } });
    fireEvent.blur(firstnameInput);
    expect(await screen.findByText('The first name must not contain numbers or special characters.')).toBeTruthy();
  });
  it('should show error message when field Email are touched but empty', async () => {
    const input = screen.getByLabelText('Email :');
    fireEvent.blur(input);
    expect(await screen.findByText('Email is required.')).toBeTruthy();
  });
  it('should show error message when field Date of Birth are touched but empty', async () => {
    const input = screen.getByLabelText('Date of Birth :');
    fireEvent.blur(input);
    expect(await screen.findByText('Date of birth is required.')).toBeTruthy();
  });
  it('should show error message when field City are touched but empty', async () => {
    const input = screen.getByLabelText('City :');
    fireEvent.blur(input);
    expect(await screen.findByText('City is required.')).toBeTruthy();
  });
  it('should allow valid city names with hyphen', async () => {
    fireEvent.input(screen.getByLabelText('City :'), { target: { value: 'Saint-Félix' } });
    expect(screen.getByLabelText('City :').classList).not.toContain('ng-invalid');
  });
  it('should show an error message when field City is filled with numbers', async () => {
    const cityInput = screen.getByLabelText('City :');
    fireEvent.input(cityInput, { target: { value: 'Test4545' } });
    expect(await screen.findByText('The city must not contain numbers or special characters.')).toBeTruthy();
  });
  it('should show error message when field Postal Code are touched but empty', async () => {
    const input = screen.getByLabelText('Postal Code :');
    fireEvent.blur(input);
    expect(await screen.findByText('Postal code is required.')).toBeTruthy();
  });
  it('should show error message when Postal Code is touched but has only 4 digits', async () => {
    const input = screen.getByLabelText('Postal Code :');
    fireEvent.input(input, { target: { value: '1234' } });
    fireEvent.blur(input);
    expect(await screen.findByText('Invalid format, must be a 5-digit number.')).toBeTruthy();
  });


  /**
   * Test to verify the submit button is enabled when the form is valid.
   */
  it('should enable the submit button when the form is valid', async () => {
    fireEvent.input(screen.getByLabelText('Name :'), { target: { value: 'Maxime' } });
    fireEvent.input(screen.getByLabelText('First Name :'), { target: { value: 'Maxime' } });
    fireEvent.input(screen.getByLabelText('Email :'), { target: { value: 'maxime.maxime@gmail.com' } });
    fireEvent.input(screen.getByLabelText('Date of Birth :'), { target: { value: '2001-10-10' } });
    fireEvent.input(screen.getByLabelText('City :'), { target: { value: 'Montpellier' } });
    fireEvent.input(screen.getByLabelText('Postal Code :'), { target: { value: '34000' } });

    const submitButton = screen.getByRole('button', { name: /Register/i });
    expect(submitButton.hasAttribute('disabled')).toBe(false);
  });

  /**
   * Test to verify the form shows an error message when the user's age is less than 18.
   */
  it('should show an error message when the age is less than 18', async () => {
    fireEvent.input(screen.getByLabelText('Name :'), { target: { value: 'Maxime' } });
    fireEvent.input(screen.getByLabelText('First Name :'), { target: { value: 'Maxime' } });
    fireEvent.input(screen.getByLabelText('Email :'), { target: { value: 'maxime.maxime@gmail.com' } });
    fireEvent.input(screen.getByLabelText('Date of Birth :'), { target: { value: '2010-10-10' } });
    fireEvent.input(screen.getByLabelText('City :'), { target: { value: 'Montpellier' } });
    fireEvent.input(screen.getByLabelText('Postal Code :'), { target: { value: '34000' } });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    const errorMessage = await screen.findByText('You must be at least 18 years old.');
    expect(errorMessage).toBeTruthy();
  });

  /**
   * Test to verify a success toast message is shown after successful form submission.
   */
  it('should show a success toaster message on form submission', async () => {
    fireEvent.input(screen.getByLabelText('Name :'), { target: { value: 'Maxime' } });
    fireEvent.input(screen.getByLabelText('First Name :'), { target: { value: 'Maxime' } });
    fireEvent.input(screen.getByLabelText('Email :'), { target: { value: 'maxime.maxime@gmail.com' } });
    fireEvent.input(screen.getByLabelText('Date of Birth :'), { target: { value: '2001-10-10' } });
    fireEvent.input(screen.getByLabelText('City :'), { target: { value: 'Montpellier' } });
    fireEvent.input(screen.getByLabelText('Postal Code :'), { target: { value: '34000' } });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    const toasterMessage = await screen.findByText('Registration successful!');
    expect(toasterMessage).toBeTruthy();
  });

  /**
   * Test to verify the age validation function returns null if the user is 18 or older.
   */
  it('should return null if the user is 18 or older', () => {
    const control = { value: '2000-10-10' };
    const result = new RegisterFormComponent(new FormBuilder(), {} as ToastrService, {} as HttpClient).checkBirthday(control);
    expect(result).toBeNull();
  });

  /**
   * Test to verify the age validation function returns an error object if the user is under 18.
   */
  it('should return an error object if the user is under 18', () => {
    const control = { value: '2010-10-10' };
    const result = new RegisterFormComponent(new FormBuilder(), {} as ToastrService, {} as HttpClient).checkBirthday(control);
    expect(result).toEqual({ minAge: true });
  });

  /**
   * Test to verify that form controls have null values initially.
   */
  it('should have null values for form controls initially', () => {
    const component = new RegisterFormComponent(new FormBuilder(), {} as ToastrService, {} as HttpClient);

    expect(component.name?.value).toEqual('');  // Name field
    expect(component.firstname?.value).toEqual('');   // First name field
    expect(component.email?.value).toEqual('');   // Email field
    expect(component.birthday?.value).toEqual('');   // Birthday field
    expect(component.city?.value).toEqual('');  // City field
    expect(component.postalCode?.value).toEqual('');   // Postal code field
  });

  /**
   * Test to verify that values can be correctly set and retrieved from form controls.
   */
  it('should set and retrieve values for form controls correctly', () => {
    const component = new RegisterFormComponent(new FormBuilder(), {} as ToastrService, {} as HttpClient);

    component.name?.setValue('Maxime');
    expect(component.name?.value).toBe('Maxime');

    component.firstname?.setValue('Dupont');
    expect(component.firstname?.value).toBe('Dupont');

    component.email?.setValue('maxime@gmail.com');
    expect(component.email?.value).toBe('maxime@gmail.com');

    component.birthday?.setValue('2000-10-10');
    expect(component.birthday?.value).toBe('2000-10-10');

    component.city?.setValue('Montpellier');
    expect(component.city?.value).toBe('Montpellier');

    component.postalCode?.setValue('34000');
    expect(component.postalCode?.value).toBe('34000');
  });

  /**
   * Test to verify the form is reset after successful submission.
   */
  it('should reset the form after successful submission', async () => {
    const component = new RegisterFormComponent(new FormBuilder(), {} as ToastrService, {} as HttpClient);
    fireEvent.input(screen.getByLabelText('Name :'), { target: { value: 'Maxime' } });
    fireEvent.input(screen.getByLabelText('First Name :'), { target: { value: 'Dupont' } });
    fireEvent.input(screen.getByLabelText('Email :'), { target: { value: 'maxime@gmail.com' } });
    fireEvent.input(screen.getByLabelText('Date of Birth :'), { target: { value: '2000-10-10' } });
    fireEvent.input(screen.getByLabelText('City :'), { target: { value: 'Montpellier' } });
    fireEvent.input(screen.getByLabelText('Postal Code :'), { target: { value: '34000' } });
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    expect(component.name?.value).toEqual('');
    expect(component.firstname?.value).toEqual('');
    expect(component.email?.value).toEqual('');
    expect(component.birthday?.value).toEqual('');
    expect(component.city?.value).toEqual('');
    expect(component.postalCode?.value).toEqual('');
  });

});
