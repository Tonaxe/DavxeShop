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
  private token = sessionStorage.getItem('token');
  private headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  };

  constructor(private http: HttpClient) { }

  register(registerRequest: RegisterRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}register`, registerRequest);
  }

  logIn(logInRequest: LogInRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}login`, logInRequest);
  }

  logOut(logOutRequest: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}logout`, JSON.stringify(logOutRequest), { headers : this.headers });
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
    return this.http.get<User>(`${this.baseUrl}users/${userId}`, { headers : this.headers });
  }

  addProduct(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.baseUrl}producto`, producto, { headers : this.headers });
  }

  getProductosPorUsuario(userId: number): Observable<ProductosResponse> {
    return this.http.get<ProductosResponse>(`${this.baseUrl}productos/users/${userId}`, { headers: this.headers });
  }

  getRandomProductos(): Observable<ProductosResponse> {
    return this.http.get<ProductosResponse>(`${this.baseUrl}productos/random`, { headers: this.headers });
  }
}