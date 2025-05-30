import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LogInRequest, LoginResponse } from "../models/logIn.model";
import { RegisterRequest } from "../models/register.model";
import { ResetPasswordComponentRequest } from "../models/resetPasswordRequest.model";
import { UpdateProfile, User } from "../models/user.model";
import { VerifyRecoveryCode } from "../models/verifyRecoveryCode.model";
import { Producto, ProductoResponse, ProductosResponse, UserProductsResponse } from "../models/product.model";
import { CategoriaResponse } from "../models/categoria.model";
import { EstadoResponse } from "../models/estado.model";
import { CrearCompraRequest, CrearCompraResponse } from "../models/compra.model";
import { CrearConversacionDto, CrearMensajeDto } from "../models/chat.model";
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';



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

  crearCompra(compraDto: CrearCompraRequest): Observable<CrearCompraResponse> {
    return this.http.post<CrearCompraResponse>(`${this.baseUrl}compras`, compraDto, { headers: this.getHeaders() });
  }

  updateProfile(updateProfile: UpdateProfile): Observable<string> {
    return this.http.patch<string>(`${this.baseUrl}users/update-profile`, updateProfile, { headers: this.getHeaders() });
  }

  crearConversacion(dto: CrearConversacionDto): Observable<any> {
    return this.http.post(`${this.baseUrl}chat/conversacion`, dto, { headers: this.getHeaders() });
  }

  obtenerConversaciones(): Observable<any> {
    return this.http.get(`${this.baseUrl}chat/conversaciones`, { headers: this.getHeaders() });
  }

  obtenerConversacion(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}chat/conversacion/${id}`, { headers: this.getHeaders() });
  }

  enviarMensaje(dto: CrearMensajeDto): Observable<any> {
    return this.http.post(`${this.baseUrl}chat/mensaje`, dto, { headers: this.getHeaders() });
  }

  eliminarConversacion(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}chat/conversacion/${id}`, { headers: this.getHeaders() });
  }

  eliminarMensaje(mensajeId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}chat/mensaje/${mensajeId}`, { headers: this.getHeaders() });
  }

  editarMensaje(mensajeId: number, contenido: string): Observable<any> {
    const body = { contenido };
    return this.http.patch(`${this.baseUrl}chat/mensaje/${mensajeId}`, body, { headers: this.getHeaders() });
  }
   actualizarProducto(producto: Producto) {
    console.log('Simulando actualización del producto:', producto);

    // Simulamos una espera de 1 segundo como si fuera una llamada real
    return of({ mensaje: 'Producto actualizado correctamente' }).pipe(delay(1000));
  }
}