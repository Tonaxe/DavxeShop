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

export interface UsuarioConProductos {
  userId: number;
  nombre: string;
  foto: string;
  productos: { productoId: number; nombre: string; imagenUrl: string }[];
}

export interface UserProductsResponse {
  userProducts: UsuarioConProductos[];
}