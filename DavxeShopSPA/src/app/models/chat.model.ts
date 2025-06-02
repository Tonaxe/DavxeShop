export interface CrearMensajeDto {
  conversacionId: number;
  usuarioId: number;
  contenido: string;
  tipo?: "oferta" | "mensaje";
  oferta?: {
    precio: number;
    descripcion: string;
    estado: string;
    imagenUrl: string;
  }
}

export interface CrearConversacionDto {
  SellerId: number;
  CompraId?: number;
}

export interface Message {
  id: string;
  senderId: string;
  timestamp: Date;
  content?: string;
  tipo?: 'normal' | 'oferta';
  oferta?: {
    productoFotoUrl: string;
    productoNombre: string;
    comentario: string;
    precioContraOferta: number;
  };
}

export interface ChatMessage {
  id?: number;
  conversacionId?: number;
  usuarioId?: number;
  message: string;
  timestamp: string | Date;
  tipo?: 'mensaje' | 'oferta';

  oferta?: {
    precio: number;
    descripcion: string;
    estado: 'pendiente' | 'aceptada' | 'rechazada';
  };
}

export interface ChatUser {
  userId: number;
  name: string;
  imageBase64: string;
}


export interface ContraOfertaResponseDto {
  mensajeId: number;
  conversacionId: number;
  remitenteId: number;
  precioContraOferta: number;
  comentario: string;
  fechaEnvio: string;
  leido: boolean;
  productoId: number;
  productoNombre: string;
  productoFotoUrl: string;
}

export interface ContraOfertaDto {
  conversacionId: number;
  remitenteId: number;
  productoId: number;
  precioContraOferta: number;
  comentario: string;
}