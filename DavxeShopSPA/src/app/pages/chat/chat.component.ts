import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  users = [
    { name: 'Juan Pérez', avatar: 'https://i.pravatar.cc/40?u=juan', isActive: true },
    { name: 'María López', avatar: 'https://i.pravatar.cc/40?u=maria', isActive: false },
    { name: 'Carlos Ruiz', avatar: 'https://i.pravatar.cc/40?u=carlos', isActive: false },
    { name: 'Ana Torres', avatar: 'https://i.pravatar.cc/40?u=ana', isActive: false }
  ];

  activeUser = this.users[0];

  messages = [
    { content: 'Hola, ¿cómo estás?' },
    { content: '¡Hola! Bienvenido al chat.' }
  ];

  messageInput: string = '';

  sendMessage() {
    if (this.messageInput.trim()) {
      this.messages.push({ content: this.messageInput });
      this.messageInput = '';
    }
  }
}
