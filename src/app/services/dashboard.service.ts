import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserDetails } from '../utilities/UserDetails';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  url = 'http://localhost:3000/dashboard';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(`${this.url}`);
  }

  getUser(id: number): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.url}/${id}`);
  }

  updateUser(data: UserDetails): Observable<UserDetails> {
    return this.http.put<UserDetails>(`${this.url}/${data.id}`, data);
  }

  deleteUser(id: number): Observable<UserDetails> {
    return this.http.delete<UserDetails>(`${this.url}/${id}`);
  }

  addNewUser(data: UserDetails): Observable<UserDetails> {
    return this.http.post<UserDetails>(`${this.url}`, data);
  }
}
