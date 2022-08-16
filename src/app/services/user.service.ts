import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../utilities/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  api = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.api}/users`);
  }

  addNewUser(user: User) {
    return this.http.post<User>(`${this.api}/users`, user);
  }
}
