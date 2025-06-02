import { Injectable, NgZone } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { ChatMessage, ContraOfertaResponseDto } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  private messageSource = new BehaviorSubject<ChatMessage | null>(null);
  messageReceived$ = this.messageSource.asObservable();

  private messageDeletedSource = new BehaviorSubject<number | null>(null);
  messageDeleted$ = this.messageDeletedSource.asObservable();

  private messageEditedSource = new BehaviorSubject<{ mensajeId: number, contenido: string } | null>(null);
  messageEdited$ = this.messageEditedSource.asObservable();

  private contraOfertaSource = new BehaviorSubject<ContraOfertaResponseDto | null>(null);
  contraOfertaReceived$ = this.contraOfertaSource.asObservable();

  constructor(private ngZone: NgZone) { }

  public startConnection(token: string): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44355/chatHub', {
        accessTokenFactory: () => token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connection started'))
      .catch(err => console.error('Error while starting SignalR connection: ', err));

    this.registerOnServerEvents();
  }

  private registerOnServerEvents(): void {
    this.hubConnection.on('RecibirMensaje', (mensaje) => {
      this.ngZone.run(() => {
        const msg: ChatMessage = {
          id: mensaje.mensajeId ? parseInt(mensaje.mensajeId) : Date.now(),
          conversacionId: parseInt(mensaje.conversacionId),
          usuarioId: parseInt(mensaje.remitenteId),
          message: mensaje.contenido,
          timestamp: new Date(mensaje.fechaEnvio),
          tipo: mensaje.tipo || 'texto',
          oferta: mensaje.oferta || null
        };
        this.messageSource.next(msg);
      });
    });

    this.hubConnection.on('EliminarMensaje', (mensajeId: string) => {
      this.ngZone.run(() => {
        this.messageDeletedSource.next(parseInt(mensajeId));
      });
    });

    this.hubConnection.on('MensajeEditado', (mensaje: { mensajeId: number, contenido: string }) => {
      this.ngZone.run(() => {
        this.messageEditedSource.next(mensaje);
      });
    });

    this.hubConnection.on('RecibirContraOferta', (contraOferta: ContraOfertaResponseDto) => {
      this.ngZone.run(() => {
        this.contraOfertaSource.next(contraOferta);
      });
    });
  }

  public sendMessage(conversacionId: number, remitenteId: number, contenido: string): void {
    if (this.hubConnection?.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.invoke('EnviarMensaje', conversacionId.toString(), remitenteId.toString(), contenido)
        .catch(err => console.error(err));
    }
  }

  public joinConversation(conversacionId: number): void {
    if (this.hubConnection?.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.invoke('UnirseConversacion', conversacionId.toString())
        .catch(err => console.error('Error al unirse a la conversación:', err));
    }
  }

  public sendContraOferta(conversacionId: number, contraOferta: ContraOfertaResponseDto): void {
    if (this.hubConnection?.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.invoke('EnviarContraOferta', conversacionId.toString(), contraOferta)
        .catch(err => console.error('Error enviando contraoferta:', err));
    }
  }
}
