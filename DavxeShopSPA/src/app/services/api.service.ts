import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LogInRequest, LoginResponse } from "../models/logIn.model";
import { RegisterRequest } from "../models/register.model";
import { ResetPasswordComponentRequest } from "../models/resetPasswordRequest.model";
import { User } from "../models/user.model";
import { VerifyRecoveryCode } from "../models/verifyRecoveryCode.model";
import { Producto, ProductosResponse } from "../models/product.model";


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://localhost:44355/api/DavxeShop/';

  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = sessionStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  register(registerRequest: RegisterRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}register`, registerRequest);
  }

  logIn(logInRequest: LogInRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}login`, logInRequest);
  }

  logOut(): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}logout`, null, { headers : this.getHeaders() });
  }

  recoverPassword(email: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}recover-password`, JSON.stringify(email));
  }

  verifyRecoveryCode(verifyRecoveryCode: VerifyRecoveryCode): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}verifty-recover-password`, verifyRecoveryCode);
  }
  
  changePassword(resetPasswordComponentRequest: ResetPasswordComponentRequest): Observable<string> {
    return this.http.patch<string>(`${this.baseUrl}reset-password`, resetPasswordComponentRequest);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}users/${userId}`, { headers : this.getHeaders() });
  }

  addProduct(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.baseUrl}producto`, producto, { headers : this.getHeaders() });
  }

  getProductosPorUsuario(userId: number): Observable<ProductosResponse> {
    return this.http.get<ProductosResponse>(`${this.baseUrl}productos/users/${userId}`, { headers: this.getHeaders() });
  }

  getRandomProductos(): Observable<ProductosResponse> {
    return this.http.get<ProductosResponse>(`${this.baseUrl}productos/random`, { headers: this.getHeaders() });
  }
}