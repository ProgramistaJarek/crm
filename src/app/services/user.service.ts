import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../utilities/User';
import { Observable, map } from 'rxjs';

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

  loginWithEmail(email: string, password: string) {
    return this.http.get<User[]>(`${this.api}/users`).pipe(
      map((user) => {
        user.forEach((key) => {
          if (key.email === email && key.password === password) {
            return localStorage.setItem('uid', String(key.id));
          }
          return null;
        });
      })
    );
  }

  getUid() {
    return localStorage.getItem('uid');
  }
}
