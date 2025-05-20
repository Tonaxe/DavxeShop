import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
// Lista de usuarios, con su nombre, avatar y un indicador de si están activos
users = [
  { name: 'Juan Pérez', avatar: 'https://i.pravatar.cc/40?u=juan', isActive: true },
  { name: 'María López', avatar: 'https://i.pravatar.cc/40?u=maria', isActive: false },
  { name: 'Carlos Ruiz', avatar: 'https://i.pravatar.cc/40?u=carlos', isActive: false },
  { name: 'Ana Torres', avatar: 'https://i.pravatar.cc/40?u=ana', isActive: false }
];

// Usuario activo (inicialmente Juan Pérez)
activeUser = this.users[0];

// Mensajes previos
messages = [
  { content: 'Hola, ¿cómo estás?' },
  { content: '¡Hola! Bienvenido al chat.' }
];

// Variable para el input del mensaje
messageInput: string = '';

// Función para enviar un mensaje
sendMessage() {
  if (this.messageInput.trim()) {
    this.messages.push({ content: this.messageInput });
    this.messageInput = ''; // Limpiar el campo de texto después de enviar
  }
}
}
