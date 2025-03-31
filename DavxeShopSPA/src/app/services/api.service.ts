import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/register.model';
import { LogInRequest } from '../models/logIn.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://localhost:44355/api/DavxeShop/';

  constructor(private http: HttpClient) { }

  register(registerRequest: RegisterRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}register`, registerRequest);
  }

  logIn(logInRequest: LogInRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}login`, logInRequest);
  }

  logOut(logOutRequest: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}logout`, logOutRequest);
  }
}

