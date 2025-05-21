export interface Producto {
  productoId: number;
  nombre: string;
  descripcion: string;
  precio: number;
  fechaPublicacion: string;
  categoria: string;
  imagenUrl: string;
  userId: number;
}

export interface ProductosResponse {
  productos: Producto[];
}
