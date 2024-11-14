import { User } from '../../shared/models/user.model';

export const mockUser: User = {
  results: [
    {
      gender: 'male',
      name: { title: 'Mr', first: 'John', last: 'Doe' },
      location: {
        street: { number: 123, name: 'Main St' },
        city: 'Anytown',
        state: 'Anystate',
        country: 'USA',
        postcode: '12345',
        coordinates: { latitude: '34.0522', longitude: '-118.2437' },
        timezone: { offset: '-08:00', description: 'Pacific Time (US & Canada)' }
      },
      email: 'john.doe@example.com',
      login: {
        uuid: '1234-5678-91011',
        username: 'johndoe',
        password: 'password123',
        salt: 'salt',
        md5: 'md5hash',
        sha1: 'sha1hash',
        sha256: 'sha256hash'
      },
      dob: { date: '1980-01-01T00:00:00Z', age: 43 },
      registered: { date: '2010-01-01T00:00:00Z', age: 13 },
      phone: '555-555-5555',
      cell: '555-555-5555',
      id: { name: 'SSN', value: '123-45-6789' },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/1.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/1.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/1.jpg'
      },
      nat: 'US'
    },
    {
      gender: 'female',
      name: { title: 'Ms', first: 'Jane', last: 'Smith' },
      location: {
        street: { number: 456, name: 'Maple Ave' },
        city: 'Somecity',
        state: 'Somestate',
        country: 'Canada',
        postcode: 'A1A 1A1',
        coordinates: { latitude: '45.4215', longitude: '-75.6972' },
        timezone: { offset: '-05:00', description: 'Eastern Time (US & Canada)' }
      },
      email: 'jane.smith@example.com',
      login: {
        uuid: '91011-1213-1415',
        username: 'janesmith',
        password: 'password456',
        salt: 'salt2',
        md5: 'md5hash2',
        sha1: 'sha1hash2',
        sha256: 'sha256hash2'
      },
      dob: { date: '1990-05-15T00:00:00Z', age: 33 },
      registered: { date: '2015-05-15T00:00:00Z', age: 8 },
      phone: '555-123-4567',
      cell: '555-765-4321',
      id: { name: 'SIN', value: '987-65-4321' },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/1.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/1.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/1.jpg'
      },
      nat: 'CA'
    }
  ],
  info: {
    seed: 'abc123',
    results: 2,
    page: 1,
    version: '1.3'
  }
};
