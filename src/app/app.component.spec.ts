import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(async () => {
    await render(AppComponent, {
      imports: [ReactiveFormsModule, ToastrModule.forRoot(), BrowserAnimationsModule],
    });
  });

  it('should render the form title', () => {
    expect(screen.getByText('Register')).toBeTruthy();
  });
});
