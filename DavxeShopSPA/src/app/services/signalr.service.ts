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
    this.hubConnection.on('ReceiveMessage', (user: string, message: string, timestamp: string) => {
      this.ngZone.run(() => {

        this.messageSource.next({
          conversacionId: 0,
          usuarioId: 0,
          message,
          timestamp: new Date(timestamp)
        });
      });
    });
  }

  public sendMessage(user: string, message: string): void {
    if (this.hubConnection && this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.invoke('SendMessage', user, message)
        .catch(err => console.error(err));
    }
  }
}