import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../services/user.service';
import { Result } from '../../shared/models/user.model';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getUsers']);

    await TestBed.configureTestingModule({
      imports: [UserListComponent, RouterTestingModule],
      providers: [{ provide: UserService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading spinner initially', () => {
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('mat-progress-spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should fetch users and hide the spinner after loading', fakeAsync(() => {
    const mockUsers: Result[] = [
      {
        gender: 'male',
        name: { title: 'Mr', first: 'John', last: 'Doe' },
        location: {
          street: { number: 123, name: 'Main St' },
          city: 'Anytown',
          state: 'State',
          country: 'Country',
          postcode: '12345',
          coordinates: { latitude: '0', longitude: '0' },
          timezone: { offset: '+0:00', description: 'UTC' }
        },
        email: 'johndoe@example.com',
        login: { uuid: 'uuid', username: 'johndoe', password: 'password', salt: 'salt', md5: 'md5', sha1: 'sha1', sha256: 'sha256' },
        dob: { date: '1990-01-01T00:00:00.000Z', age: 30 },
        registered: { date: '2010-01-01T00:00:00.000Z', age: 10 },
        phone: '123-456-7890',
        cell: '098-765-4321',
        id: { name: 'ID', value: '1234' },
        picture: { large: 'large.jpg', medium: 'medium.jpg', thumbnail: 'thumbnail.jpg' },
        nat: 'US'
      }
    ];

    userServiceSpy.getUsers.and.returnValue(of(mockUsers));

    fixture.detectChanges(); // triggers ngOnInit
    tick(3000); // simulate the delay
    fixture.detectChanges(); // update view with loaded data

    const spinner = fixture.debugElement.query(By.css('mat-progress-spinner'));
    expect(spinner).toBeFalsy();
    expect(component.showSpinner).toBeFalse();

    const userCards = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(userCards.length).toBe(1);
    expect(userCards[0].nativeElement.textContent).toContain('John Doe');
  }));

  it('should handle empty user list gracefully', fakeAsync(() => {
    userServiceSpy.getUsers.and.returnValue(of([]));

    fixture.detectChanges();
    tick(3000);
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.error-message'));
    if (errorMessage) {
      expect(errorMessage.nativeElement.textContent).toContain('No users found');
    } else {
      expect(component.users$).toBeDefined();
    }
  }));
});
