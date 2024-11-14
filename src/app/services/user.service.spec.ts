import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../shared/models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [UserService, { provide: HttpClient, useValue: spy }]
    });

    service = TestBed.inject(UserService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users list', (done) => {
    const mockResponse: User = {
      results: [
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
          login: {
            uuid: 'uuid',
            username: 'johndoe',
            password: 'password',
            salt: 'salt',
            md5: 'md5',
            sha1: 'sha1',
            sha256: 'sha256'
          },
          dob: { date: '1990-01-01T00:00:00.000Z', age: 30 },
          registered: { date: '2010-01-01T00:00:00.000Z', age: 10 },
          phone: '123-456-7890',
          cell: '098-765-4321',
          id: { name: 'ID', value: '1234' },
          picture: { large: 'large.jpg', medium: 'medium.jpg', thumbnail: 'thumbnail.jpg' },
          nat: 'US'
        }
      ],
      info: { seed: 'seed', results: 1, page: 1, version: '1.0' }
    };

    httpClientSpy.get.and.returnValue(of(mockResponse));

    service.getUsers().subscribe((results) => {
      expect(results.length).toBe(1);
      expect(results[0].name.first).toBe('John');
      done();
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(`${environment.apiEndpoint}/api/?results=50`);
  });

  it('should fetch a single user', (done) => {
    const mockResponse: User = {
      results: [
        {
          gender: 'female',
          name: { title: 'Ms', first: 'Jane', last: 'Doe' },
          location: {
            street: { number: 456, name: 'Elm St' },
            city: 'Othertown',
            state: 'State',
            country: 'Country',
            postcode: '67890',
            coordinates: { latitude: '10', longitude: '20' },
            timezone: { offset: '-3:00', description: 'Somewhere' }
          },
          email: 'janedoe@example.com',
          login: {
            uuid: 'uuid2',
            username: 'janedoe',
            password: 'password2',
            salt: 'salt2',
            md5: 'md5',
            sha1: 'sha1',
            sha256: 'sha256'
          },
          dob: { date: '1985-02-02T00:00:00.000Z', age: 35 },
          registered: { date: '2005-02-02T00:00:00.000Z', age: 15 },
          phone: '321-654-9870',
          cell: '876-543-2109',
          id: { name: 'ID2', value: '5678' },
          picture: { large: 'large2.jpg', medium: 'medium2.jpg', thumbnail: 'thumbnail2.jpg' },
          nat: 'CA'
        }
      ],
      info: { seed: 'seed2', results: 1, page: 1, version: '1.0' }
    };

    httpClientSpy.get.and.returnValue(of(mockResponse));

    service.getUser().subscribe((results) => {
      expect(results.length).toBe(1);
      expect(results[0].name.first).toBe('Jane');
      done();
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(`${environment.apiEndpoint}/api/`);
  });
});
