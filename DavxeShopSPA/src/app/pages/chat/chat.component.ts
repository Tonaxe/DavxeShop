import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { SignalRService } from '../../services/signalr.service';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  users: any[] = [];
  activeUser: any = null;
  messages: any[] = [];
  messageInput: string = '';
  currentUserId!: number;
  activeConversationId!: number;
  editingMessage: any = null;

  private messageSub?: Subscription;

  constructor(
    private apiService: ApiService,
    private signalRService: SignalRService
  ) { }

  ngOnInit() {
    this.loadCurrentUser();
    this.loadUsers();
    this.setupSignalR();
  }

  ngOnDestroy() {
    this.messageSub?.unsubscribe();
  }

  private loadCurrentUser() {
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      const stored = JSON.parse(userStr);
      const user = stored.user;
      this.currentUserId = user.userId;
    }
  }

  private setupSignalR() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.signalRService.startConnection(token);
      this.messageSub = this.signalRService.messageReceived$.subscribe((msg: any) => {
        if (msg && this.activeConversationId === msg.conversacionId && msg.usuarioId !== undefined) {
          this.handleIncomingMessage(msg);
        }
      });
    }
  }

  private handleIncomingMessage(msg: any) {
    this.messages.push({
      id: msg.id || Date.now(),
      senderId: msg.usuarioId,
      content: msg.message,
      timestamp: new Date(msg.timestamp)
    });
    this.scrollToBottom();
  }

  loadUsers() {
    this.apiService.obtenerConversaciones().subscribe({
      next: (conversaciones: any[]) => {
        this.users = conversaciones.map(conv => {
          const u = conv.otroUsuario;
          return {
            userId: u.userId,
            name: u.nombre,
            imageBase64: u.imagenUrl || ''
          };
        }).filter(Boolean);

        if (this.users.length > 0) {
          this.selectUser(this.users[0]);
        }
      },
      error: (err) => console.error('Error cargando usuarios', err)
    });
  }

  selectUser(user: any) {
    this.activeUser = user;
    this.getOrCreateConversation(user.userId);
  }

  getOrCreateConversation(sellerId: number, compraId?: number) {
    const crearConversacionDto = { SellerId: sellerId, CompraId: compraId };
    
    this.apiService.crearConversacion(crearConversacionDto).subscribe({
      next: (conv: any) => {
        this.activeConversationId = conv.conversacionId;
        this.signalRService.joinConversation(conv.conversacionId);
        this.loadMessages(this.activeConversationId);
      },
      error: (err) => console.error('Error al obtener/crear conversación', err)
    });
  }

  loadMessages(conversacionId: number) {
    this.apiService.obtenerConversacion(conversacionId).subscribe({
      next: (conversacion: any) => {
        if (!conversacion?.mensajes) {
          this.messages = [];
          return;
        }

        this.messages = conversacion.mensajes.map((m: any) => ({
          id: m.mensajeId,
          senderId: m.remitenteId,
          content: m.contenido,
          timestamp: new Date(m.fechaEnvio)
        }));

        this.scrollToBottom();
      },
      error: (err) => console.error('Error cargando mensajes', err)
    });
  }

  editMessage(message: any) {
    this.messageInput = message.content;
    this.editingMessage = message;
  }

  deleteMessage(message: any) {
    if (confirm('¿Estás seguro de que quieres eliminar este mensaje?')) {
      // Implementar lógica de eliminación cuando el backend lo soporte
      console.log('Mensaje a eliminar:', message.id);
      // this.apiService.eliminarMensaje(message.id).subscribe(...);
      this.messages = this.messages.filter(m => m.id !== message.id);
    }
  }

  sendMessage() {
    if (!this.messageInput.trim() || !this.activeConversationId || !this.currentUserId) return;

    const messageContent = this.messageInput.trim();
    const mensajeDto = {
      conversacionId: this.activeConversationId,
      usuarioId: this.currentUserId,
      contenido: messageContent
    };

    if (this.editingMessage) {
      // Implementar actualización cuando el backend lo soporte
      console.log('Mensaje a actualizar:', this.editingMessage.id);
      // this.apiService.actualizarMensaje(...).subscribe(...);
      const index = this.messages.findIndex(m => m.id === this.editingMessage.id);
      if (index !== -1) {
        this.messages[index].content = messageContent;
      }
      this.cancelEdit();
    } else {
      this.apiService.enviarMensaje(mensajeDto).subscribe({
        next: (newMessage: any) => {
          this.signalRService.sendMessage(this.activeConversationId, this.currentUserId, messageContent);
          this.messages.push({
            id: newMessage.mensajeId,
            senderId: this.currentUserId,
            content: newMessage.contenido,
            timestamp: new Date(newMessage.fechaEnvio)
          });
          this.messageInput = '';
          this.scrollToBottom();
        },
        error: (err) => console.error('Error al enviar mensaje', err)
      });
    }
  }

  cancelEdit() {
    this.editingMessage = null;
    this.messageInput = '';
  }

  private scrollToBottom() {
    setTimeout(() => {
      const container = document.querySelector('.chat-messages');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 50);
  }
}