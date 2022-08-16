import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../utilities/User';
import {
  Observable,
  BehaviorSubject,
  tap,
  filter,
  switchMap,
  throwIfEmpty,
  map,
  count,
} from 'rxjs';

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
    return this.http.get<User>(`${this.api}/users/${id}`);
  }

  addNewUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.api}/users`, user);
  }

  loginWithEmail(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.api}/users`).pipe(
      switchMap((result) => {
        return result;
      }),
      filter((user) => {
        return user.email == email && user.password == password;
      }),
      tap((respone) => {
        this.isUserLoggedIn.next(true);
        localStorage.setItem('uid', String(respone.id));
      }),
      throwIfEmpty(() => {
        throw new Error('Wrong email or password');
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

  checkIfAddressEmailExist(email: string) {
    return this.http.get<User[]>(`${this.api}/users`).pipe(
      switchMap((result) => {
        return result;
      }),
      filter((user) => {
        return user.email == email;
      }),
      count(),
      map((res) => {
        if (res > 0) {
          throw new Error('Email is already taken');
        }
      })
    );
  }
}
