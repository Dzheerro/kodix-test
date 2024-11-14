import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';
import { UserService } from '../../services/user.service';
import { Result } from '../../shared/models/user.model';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getUser']);

    await TestBed.configureTestingModule({
      imports: [UserCardComponent, RouterTestingModule],
      providers: [{ provide: UserService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading spinner initially', () => {
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('mat-progress-spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should fetch a user and hide the spinner after loading', fakeAsync(() => {
    const mockUser: Result = {
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
    };

    userServiceSpy.getUser.and.returnValue(of([mockUser]));

    fixture.detectChanges(); // triggers ngOnInit
    tick(3000); // simulate the delay
    fixture.detectChanges(); // update view with loaded data

    const spinner = fixture.debugElement.query(By.css('mat-progress-spinner'));
    expect(spinner).toBeFalsy();
    expect(component.showSpinner).toBeFalse();

    const userCard = fixture.debugElement.query(By.css('mat-card'));
    expect(userCard).toBeTruthy();
    expect(userCard.nativeElement.textContent).toContain('John Doe');
  }));

  it('should handle empty user data gracefully', fakeAsync(() => {
    userServiceSpy.getUser.and.returnValue(of([]));

    fixture.detectChanges();
    tick(3000);
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.error-message'));
    if (errorMessage) {
      expect(errorMessage.nativeElement.textContent).toContain('No user data available');
    } else {
      expect(component.user$).toBeDefined();
    }
  }));
});
