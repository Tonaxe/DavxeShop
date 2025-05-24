export interface CrearCompraRequest {
  userId: number;
  direccionEnvio: string;
  ciudad: string;
  codigoPostal: string;
  pais: string;
  email: string;
  productoIds: number[];
}

export interface CrearCompraResponse {
  compraId: number;
  numeroPedido: string;
  fecha: string;
}
