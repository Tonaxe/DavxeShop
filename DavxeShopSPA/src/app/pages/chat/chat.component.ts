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
  private editSub?: Subscription;
  private deleteSub?: Subscription;

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
    this.editSub?.unsubscribe();
    this.deleteSub?.unsubscribe();
  }

  private loadCurrentUser() {
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr).user;
      this.currentUserId = user.userId;
    }
  }

  private setupSignalR() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.signalRService.startConnection(token);

      this.messageSub = this.signalRService.messageReceived$.subscribe(msg => {
        if (msg && this.activeConversationId === msg.conversacionId) {
          this.handleIncomingMessage(msg);
        }
      });

      this.editSub = this.signalRService.messageEdited$.subscribe(edited => {
        if (edited) {
          const index = this.messages.findIndex(m => m.id === edited.mensajeId);
          console.log(edited);
          if (index !== -1) {
            const updatedMessage = {
              ...this.messages[index],
              content: edited.contenido
            };

            this.messages = [
              ...this.messages.slice(0, index),
              updatedMessage,
              ...this.messages.slice(index + 1)
            ];
          }
        }
      });

      this.deleteSub = this.signalRService.messageDeleted$.subscribe(mensajeId => {
        if (mensajeId) {
          this.messages = this.messages.filter(m => m.id !== mensajeId);
        }
      });
    }
  }

  private handleIncomingMessage(msg: any) {
    const exists = this.messages.some(m => m.id === msg.id);
    if (!exists) {
      this.messages.push({
        id: msg.id || Date.now(),
        senderId: msg.usuarioId,
        content: msg.message,
        timestamp: new Date(msg.timestamp)
      });
      this.scrollToBottom();
    }
  }

  loadUsers() {
    this.apiService.obtenerConversaciones().subscribe({
      next: (conversaciones: any[]) => {
        this.users = conversaciones.map(conv => {
          this.signalRService.joinConversation(conv.conversacionId);
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
      error: err => console.error('Error cargando usuarios', err)
    });
  }

  selectUser(user: any) {
    this.activeUser = user;
    this.getOrCreateConversation(user.userId);
  }

  getOrCreateConversation(sellerId: number, compraId?: number) {
    const crearConversacionDto = { SellerId: sellerId, CompraId: compraId };

    this.apiService.crearConversacion(crearConversacionDto).subscribe({
      next: conv => {
        this.activeConversationId = conv.conversacionId;
        this.signalRService.joinConversation(conv.conversacionId);
        this.loadMessages(this.activeConversationId);
      },
      error: err => console.error('Error al obtener/crear conversación', err)
    });
  }

  loadMessages(conversacionId: number) {
    this.apiService.obtenerConversacion(conversacionId).subscribe({
      next: conversacion => {
        this.messages = (conversacion?.mensajes || []).map((m: any) => ({
          id: m.mensajeId,
          senderId: m.remitenteId,
          content: m.contenido,
          timestamp: new Date(m.fechaEnvio)
        }));
        this.scrollToBottom();
      },
      error: err => console.error('Error cargando mensajes', err)
    });
  }

  sendMessage() {
    if (!this.messageInput.trim() || !this.activeConversationId || !this.currentUserId) return;

    const contenido = this.messageInput.trim();

    if (this.editingMessage) {
      this.apiService.editarMensaje(this.editingMessage.id, contenido).subscribe({
        next: () => {
          this.cancelEdit();
        },
        error: err => console.error('Error al editar mensaje', err)
      });
    } else {
      const mensajeDto = {
        conversacionId: this.activeConversationId,
        usuarioId: this.currentUserId,
        contenido
      };

      this.apiService.enviarMensaje(mensajeDto).subscribe({
        next: () => {
          this.messageInput = '';
          this.scrollToBottom();
        },
        error: err => console.error('Error al enviar mensaje', err)
      });
    }
  }

  editMessage(message: any) {
    this.messageInput = message.content;
    this.editingMessage = message;
  }

  deleteMessage(mensajeId: number) {
    this.apiService.eliminarMensaje(mensajeId).subscribe({
      next: () => {
      },
      error: err => console.error('Error al eliminar mensaje', err)
    });
  }

  cancelEdit() {
    this.editingMessage = null;
    this.messageInput = '';
  }

  private scrollToBottom() {
    setTimeout(() => {
      const container = document.querySelector('.chat-messages');
      if (container) container.scrollTop = container.scrollHeight;
    }, 50);
  }
}