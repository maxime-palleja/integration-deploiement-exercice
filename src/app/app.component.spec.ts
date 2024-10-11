import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list-users',
  template: ''
})
class MockListUsersComponent {
  fetchUsers = jest.fn();
}

describe('AppComponent', () => {
  it('should call fetchUsers from ListUsersComponent when refreshUsers is called', async () => {
    const { fixture } = await render(AppComponent, {
      declarations: [MockListUsersComponent]
    });
    const appComponent = fixture.componentInstance;
    appComponent.refreshUsers();
    expect(appComponent.listUsersComponent.fetchUsers).toHaveBeenCalled();
  });
});
