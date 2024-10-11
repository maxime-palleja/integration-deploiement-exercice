import {Component, ViewChild} from '@angular/core';
import {ListUsersComponent} from "./components/list-users/list-users.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('listUsersComponent') listUsersComponent!: ListUsersComponent;

  refreshUsers() {
    this.listUsersComponent.fetchUsers();
  }
}
