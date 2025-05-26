import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Message, CrearMensajeDto, ChatMessage, CrearConversacionDto } from '../../models/chat.model';
import { User } from '../../models/user.model';
import { SignalRService } from '../../services/signalr.service';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {

  users: User[] = [];
  activeUser?: User;
  messages: Message[] = [];
  messageInput: string = '';
  currentUserId!: number;
  activeConversationId!: number;

  private messageSub?: Subscription;

  constructor(
    private apiService: ApiService,
    private signalRService: SignalRService
  ) { }

  ngOnInit() {
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      const stored = JSON.parse(userStr);
      const user = stored.user;
      this.currentUserId = user.userId;
    } else {
      return;
    }


    this.loadUsers();

    const token = sessionStorage.getItem('token');
    if (token) {
      this.signalRService.startConnection(token);
      this.messageSub = this.signalRService.messageReceived$.subscribe((msg: ChatMessage | null) => {
        if (msg && this.activeConversationId === msg.conversacionId && msg.usuarioId !== undefined) {
          this.messages.push({
            senderId: msg.usuarioId,
            content: msg.message,
            timestamp: new Date(msg.timestamp)
          });
          this.scrollToBottom();
        }
      });
    }
  }

  ngOnDestroy() {
    this.messageSub?.unsubscribe();
  }

  loadUsers() {
    this.apiService.obtenerConversaciones().subscribe({
      next: (conversaciones: any[]) => {
        console.log('Conversaciones cargadas:', conversaciones);
        this.users = conversaciones
          .map(conv => {
            const u = conv.otroUsuario;
            return {
              userId: u.userId,
              name: u.nombre,
              imageBase64: u.imagenUrl || ''
            } as User;
          })
          .filter(Boolean);

        if (this.users.length > 0) {
          this.selectUser(this.users[0]);
        }
        console.log('Usuarios cargados:', this.users);
      },
      error: (err) => {
        console.error('Error cargando usuarios', err);
      }
    });
  }

  selectUser(user: User) {
    this.activeUser = user;
    this.getOrCreateConversation(user.userId);
  }

  getOrCreateConversation(sellerId: number, compraId?: number) {
    const crearConversacionDto: CrearConversacionDto = { SellerId: sellerId };
    if (compraId) crearConversacionDto.CompraId = compraId;

    this.apiService.crearConversacion(crearConversacionDto).subscribe({
      next: (conv: any) => {
        this.activeConversationId = conv.conversacionId;
        this.loadMessages(this.activeConversationId);
      },
      error: (err) => {
        console.error('Error al obtener o crear conversación', err);
      }
    });
  }

  loadMessages(conversacionId: number) {
    this.apiService.obtenerConversacion(conversacionId).subscribe({
      next: (conversacion: any) => {
        if (!conversacion || !conversacion.mensajes) {
          this.messages = [];
          return;
        }

        this.messages = conversacion.mensajes.map((m: any) => ({
          senderId: m.remitenteId,
          content: m.contenido,
          timestamp: new Date(m.fechaEnvio)
        }));

        this.scrollToBottom();
      },
      error: (err) => {
        console.error('Error cargando mensajes', err);
      }
    });
  }

  sendMessage() {
    if (!this.messageInput.trim() || !this.activeConversationId || !this.currentUserId) return;

    const messageContent = this.messageInput.trim();

    const mensajeDto: CrearMensajeDto = {
      conversacionId: this.activeConversationId,
      usuarioId: this.currentUserId,
      contenido: messageContent
    };

    this.apiService.enviarMensaje(mensajeDto).subscribe({
      next: () => {
        this.signalRService.sendMessage(this.activeUser!.name, messageContent);
        this.messages.push({
          senderId: this.currentUserId,
          content: messageContent,
          timestamp: new Date()
        });

        this.messageInput = '';
        this.scrollToBottom();
      },
      error: (err) => {
        console.error('Error al enviar mensaje', err);
      }
    });
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