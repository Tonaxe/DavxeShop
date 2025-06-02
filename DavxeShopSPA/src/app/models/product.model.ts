export interface Producto {
  productoId: number;
  nombre: string;
  descripcion: string;
  precio: number;
  fechaPublicacion: string;
  categoria: string;
  imagenUrl: string;
  userId: number;
  userNombre: string;
  userCiudad: string;
  estado: number;
  comprado: boolean;
  favorito: boolean;
}

export interface ProductosResponse {
  productos: Producto[];
}

export interface ProductosFavoritosResponse {
  userFavoritProducts: Producto[];
}

export interface UsuarioConProductos {
  userId: number;
  nombre: string;
  foto: string;
  comprado: boolean;
  productos: { productoId: number; nombre: string; imagenUrl: string }[];
}

export interface UserProductsResponse {
  userProducts: UsuarioConProductos[];
}

export interface ProductoResponse {
  producto: Producto;
}

