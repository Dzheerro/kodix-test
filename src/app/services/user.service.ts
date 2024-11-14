import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Result, User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  public getUsers(): Observable<Result[]> {
    return this.http.get<User>(`${environment.apiEndpoint}/api/?results=50`).pipe(map((response) => response.results));
  }

  public getUser(): Observable<Result[]> {
    return this.http.get<User>(`${environment.apiEndpoint}/api/`).pipe(map((response) => response.results));
  }
}
