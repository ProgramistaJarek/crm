import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../utilities/User';
import { Observable, map, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  api = 'http://localhost:3000';

  isUserLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    if (localStorage.getItem('uid')) {
      this.isUserLoggedIn.next(true);
    }
  }

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
            this.isUserLoggedIn.next(true);
            return localStorage.setItem('uid', String(key.id));
          }
          return null;
        });
      })
    );
  }

  logout() {
    this.isUserLoggedIn.next(false);
    return localStorage.removeItem('uid');
  }

  getUid() {
    return localStorage.getItem('uid');
  }
}
