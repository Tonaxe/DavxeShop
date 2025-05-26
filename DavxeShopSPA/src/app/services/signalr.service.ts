import { Injectable, NgZone } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { ChatMessage } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  private messageSource = new BehaviorSubject<ChatMessage | null>(null);
  messageReceived$ = this.messageSource.asObservable();

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
          conversacionId: parseInt(mensaje.conversacionId),
          usuarioId: parseInt(mensaje.remitenteId),
          message: mensaje.contenido,
          timestamp: new Date(mensaje.fechaEnvio)
        };
        this.messageSource.next(msg);
      });
    });
  }

  public sendMessage(conversacionId: number, remitenteId: number, contenido: string): void {
    if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.invoke('EnviarMensaje', conversacionId.toString(), remitenteId.toString(), contenido)
        .catch(err => console.error(err));
    }
  }

  public joinConversation(conversacionId: number): void {
    this.hubConnection.invoke('UnirseConversacion', conversacionId.toString())
      .catch(err => console.error('Error al unirse a la conversación:', err));
  }
}