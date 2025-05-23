import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LogInRequest, LoginResponse } from "../models/logIn.model";
import { RegisterRequest } from "../models/register.model";
import { ResetPasswordComponentRequest } from "../models/resetPasswordRequest.model";
import { User } from "../models/user.model";
import { VerifyRecoveryCode } from "../models/verifyRecoveryCode.model";
import { Producto, ProductoResponse, ProductosResponse, UserProductsResponse } from "../models/product.model";
import { CategoriaResponse } from "../models/categoria.model";
import { EstadoResponse } from "../models/estado.model";


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
    return this.http.post<string>(`${this.baseUrl}logout`, null, { headers: this.getHeaders() });
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
    return this.http.get<User>(`${this.baseUrl}users/${userId}`, { headers: this.getHeaders() });
  }

  addProduct(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.baseUrl}producto`, producto, { headers: this.getHeaders() });
  }

  getProductosPorUsuario(userId: number): Observable<ProductosResponse> {
    return this.http.get<ProductosResponse>(`${this.baseUrl}productos/users/${userId}`, { headers: this.getHeaders() });
  }

  getRandomProductos(): Observable<ProductosResponse> {
    return this.http.get<ProductosResponse>(`${this.baseUrl}productos/random`, { headers: this.getHeaders() });
  }

  getAllCategorias(): Observable<CategoriaResponse> {
    return this.http.get<CategoriaResponse>(`${this.baseUrl}categorias`, { headers: this.getHeaders() });
  }

  getRandomProductosUsers(): Observable<UserProductsResponse> {
    return this.http.get<UserProductsResponse>(`${this.baseUrl}productos/users-random`, { headers: this.getHeaders() });
  }

  getProductosByProductoId(porductoId: number): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(`${this.baseUrl}productos/${porductoId}`, { headers: this.getHeaders() });
  }

  getAllEstados(): Observable<EstadoResponse> {
    return this.http.get<EstadoResponse>(`${this.baseUrl}estados`, { headers: this.getHeaders() });
  }

  getProductosByCategoria(categoriaId: number): Observable<ProductosResponse> {
    return this.http.get<ProductosResponse>(`${this.baseUrl}categorias/${categoriaId}/productos`, { headers: this.getHeaders() });
  }

  getSearchedProducts(query: string): Observable<ProductosResponse> {
    return this.http.get<ProductosResponse>(`${this.baseUrl}search?query=${encodeURIComponent(query)}`, { headers: this.getHeaders() });
  }
}