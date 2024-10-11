import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListUsersComponent } from './list-users.component';
import { screen } from "@testing-library/angular";

describe('ListUsersComponent', () => {
  let fixture: ComponentFixture<ListUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ListUsersComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListUsersComponent);
    fixture.detectChanges();
  });

  it('should display Users title', () => {
    expect(screen.getByText('Users')).toBeTruthy();
  });
});
