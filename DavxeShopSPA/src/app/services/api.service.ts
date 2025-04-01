import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/register.model';
import { LogInRequest } from '../models/logIn.model';
import { VerifyRecoveryCode } from '../models/verifyRecoveryCode.model';
import { ResetPasswordComponentRequest } from '../models/resetPasswordRequest.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://localhost:44355/api/DavxeShop/';
  private headers = { 'Content-Type': 'application/json' };

  constructor(private http: HttpClient) { }

  register(registerRequest: RegisterRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}register`, registerRequest);
  }

  logIn(logInRequest: LogInRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}login`, logInRequest);
  }

  logOut(logOutRequest: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}logout`, JSON.stringify(logOutRequest), { headers : this.headers });
  }

  recoverPassword(email: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}recover-password`, JSON.stringify(email), { headers : this.headers });
  }

  verifyRecoveryCode(verifyRecoveryCode: VerifyRecoveryCode): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}verifty-recover-password`, verifyRecoveryCode);
  }
  
  changePassword(resetPasswordComponentRequest: ResetPasswordComponentRequest): Observable<string> {
    return this.http.patch<string>(`${this.baseUrl}reset-password`, resetPasswordComponentRequest);
  }
}