import { render, fireEvent } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
it('doit contenir un h1 "Test component"', async () => {
  const { getByText } = await render(AppComponent);
  expect(getByText('Button component')).toBeTruthy();
});

it('doit incrémenter le compteur sur le click du bouton', async () => {
  const { getByText, getByRole } = await render(AppComponent);

  const button = getByRole('button');
  const initialCounterText = getByText('0');
  expect(initialCounterText).toBeTruthy();

  fireEvent.click(button);

  const incrementedCounterText = getByText('1');
  expect(incrementedCounterText).toBeTruthy();
});
});
