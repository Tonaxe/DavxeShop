import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { SignalRService } from '../../services/signalr.service';
import { ActivatedRoute } from '@angular/router';
import { ContraOfertaDto, ContraOfertaResponseDto, CrearMensajeDto } from '../../models/chat.model';

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

  offerPreview = {
    nombre: '',
    precioOferta: 0,
    imagenUrl: '',
    productoId: 0
  };
  showContraoferta = false;

  private messageSub?: Subscription;
  private editSub?: Subscription;
  private deleteSub?: Subscription;
  private contraOfertaSub?: Subscription;

  constructor(
    private apiService: ApiService,
    private signalRService: SignalRService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadCurrentUser();

    this.route.paramMap.subscribe(params => {
      const conversationIdParam = params.get('conversationId');
      if (conversationIdParam) {
        this.activeConversationId = +conversationIdParam;
        this.loadMessages(this.activeConversationId);
        this.signalRService.joinConversation(this.activeConversationId);
      }
    });

    const state = history.state;
    if (state?.producto) {
      this.offerPreview = {
        nombre: state.producto.nombre,
        precioOferta: 0,
        imagenUrl: state.producto.imagenUrl,
        productoId: state.producto.id || state.producto.productoId
      };
      this.showContraoferta = true;
    }

    this.loadUsers();

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
          if (index !== -1) {
            this.messages[index].content = edited.contenido;
          }
        }
      });

      this.deleteSub = this.signalRService.messageDeleted$.subscribe(mensajeId => {
        if (mensajeId) {
          this.messages = this.messages.filter(m => m.id !== mensajeId);
        }
      });
      this.contraOfertaSub = this.signalRService.contraOfertaReceived$.subscribe(contraOferta => {
        if (contraOferta && contraOferta.conversacionId === this.activeConversationId) {
          this.handleIncomingContraOferta(contraOferta);
        }
      });
    }
  }

  ngOnDestroy() {
    this.messageSub?.unsubscribe();
    this.editSub?.unsubscribe();
    this.deleteSub?.unsubscribe();
    this.contraOfertaSub?.unsubscribe();
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
      this.contraOfertaSub = this.signalRService.contraOfertaReceived$.subscribe(contraOferta => {
        if (contraOferta && contraOferta.conversacionId === this.activeConversationId) {
          this.handleIncomingContraOferta(contraOferta);
        }
      });
    }
  }

  private handleIncomingContraOferta(contraOferta: ContraOfertaResponseDto) {
    const exists = this.messages.some(m => m.id === contraOferta.mensajeId);
    if (!exists) {
      this.messages.push({
        id: contraOferta.mensajeId,
        senderId: contraOferta.remitenteId,
        content: contraOferta.comentario,
        tipo: 'oferta',
        oferta: {
          productoFotoUrl: contraOferta.productoFotoUrl,
          productoNombre: contraOferta.productoNombre,
          precioContraOferta: contraOferta.precioContraOferta,
          comentario: contraOferta.comentario,
          estado: contraOferta.leido ? 'leido' : 'pendiente'
        },
        timestamp: new Date(contraOferta.fechaEnvio)
      });
      this.scrollToBottom();
    }
  }

  private handleIncomingMessage(msg: any) {
    const exists = this.messages.some(m => m.id === msg.id);
    if (!exists) {
      this.messages.push({
        id: msg.id || Date.now(),
        senderId: msg.usuarioId,
        content: msg.contenido || msg.message,
        tipo: msg.tipo || 'texto',
        oferta: msg.oferta,
        timestamp: new Date(msg.timestamp)
      });
      this.scrollToBottom();
    }
  }

  enviarContraoferta(event: { amount: number }) {
    const precioContraOferta = event.amount;
    const comentario = this.offerPreview.nombre;
    const remitenteId = this.currentUserId;
    const conversacionId = this.activeConversationId;
    const productoId = this.offerPreview.productoId;

    const dto: ContraOfertaDto = {
      conversacionId,
      remitenteId,
      precioContraOferta,
      comentario,
      productoId
    };

    this.apiService.enviarContraOferta(dto).subscribe({
      next: (response) => {
        console.log('Contraoferta enviada con nuevo endpoint', response);
        this.loadMessages(conversacionId);
        this.showContraoferta = false;
        this.signalRService.sendContraOferta(conversacionId, response);
      },
      error: (error) => {
        console.error('Error enviando contraoferta:', error);
      }
    });
  }

  openContraoferta(offer: { nombre: string; imagenUrl: string; precioOferta: number; productoId: number; }) {
    this.offerPreview = offer;
    this.showContraoferta = true;
  }

  handleSendContraoferta(event: { amount: number; }) {
    console.log('Contraoferta enviada:', event);
    this.showContraoferta = false;
  }

  handleCloseContraoferta() {
    this.showContraoferta = false;
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
            imageBase64: u.imagenUrl || '',
            conversationId: conv.conversacionId
          };
        }).filter(Boolean);

        if (this.users.length > 0) {
          if (this.activeConversationId) {
            const activeUserFound = this.users.find(u => u.conversationId === this.activeConversationId);
            if (activeUserFound) {
              this.activeUser = activeUserFound;
            } else {
              this.selectUser(this.users[0]);
            }
          } else {
            this.selectUser(this.users[0]);
          }
        }
      },
      error: err => console.error('Error cargando usuarios', err)
    });
  }

  sendOffer() {
    if (!this.activeConversationId || !this.currentUserId) return;
    if (!this.offerPreview.precioOferta || !this.offerPreview.nombre.trim()) return;

    const ofertaMensaje: CrearMensajeDto = {
      conversacionId: this.activeConversationId,
      usuarioId: this.currentUserId,
      contenido: '',
      tipo: "oferta",
      oferta: {
        precio: this.offerPreview.precioOferta,
        descripcion: this.offerPreview.nombre.trim(),
        estado: 'pendiente',
        imagenUrl: this.offerPreview.imagenUrl
      }
    };

    this.apiService.enviarMensaje(ofertaMensaje).subscribe({
      next: () => {
        this.offerPreview = { nombre: '', precioOferta: 0, imagenUrl: '', productoId: 0 };
        this.loadMessages(this.activeConversationId);
      },
      error: err => console.error('Error al enviar oferta', err)
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
        this.messages = (conversacion?.mensajes || []).map((m: any) => {
          let ofertaObj = m.oferta;
          if (typeof ofertaObj === 'string') {
            try {
              ofertaObj = JSON.parse(ofertaObj);
            } catch (e) {
              console.error('Error parseando oferta JSON:', e);
              ofertaObj = null;
            }
          }

          let contenido = m.contenido;
          let isContraOfertaJson = false;
          let contraOfertaData = null;

          try {
            const parsed = JSON.parse(m.contenido);
            if (
              parsed &&
              parsed.Comentario !== undefined &&
              parsed.PrecioContraOferta !== undefined
            ) {
              isContraOfertaJson = true;
              contraOfertaData = parsed;
            }
          } catch { }

          return {
            id: m.mensajeId,
            senderId: m.remitenteId,
            content: contenido,
            tipo: m.tipo || 'texto',
            oferta: ofertaObj,
            timestamp: new Date(m.fechaEnvio),
            isContraOfertaJson,
            contraOfertaData
          };
        });
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
      next: () => { },
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
