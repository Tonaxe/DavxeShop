export interface CrearMensajeDto {
  conversacionId: number;
  usuarioId: number;
  contenido: string;
}

export interface CrearConversacionDto {
  SellerId: number;
  CompraId?: number;
}

export interface Message {
  id?: number;
  senderId: number;
  content: string;
  timestamp: Date;
}

export interface ChatMessage {
  conversacionId?: number;
  usuarioId?: number;
  message: string;
  timestamp: string | Date;
}

export interface ChatUser {
  userId: number;
  name: string;
  imageBase64: string;
}
