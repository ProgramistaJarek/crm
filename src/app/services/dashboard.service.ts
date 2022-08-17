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

  updateUser(data: UserDetails): Observable<UserDetails> {
    return this.http.put<UserDetails>(`${this.url}/${data.id}`, data);
  }
}
