import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../environment';
import * as signalR from "@microsoft/signalr"


export interface IPubSubMessage {
  topic: string[];
  content: any;
}
@Injectable({
  providedIn: 'root'
})
export class PubsubService {
  private _hub?: signalR.HubConnection;
  private _messageSubject?: Subject<IPubSubMessage>;

  constructor(
      private ngZone: NgZone,
  ) {
      this._init();
      this._initMessageReceiver();
  }

  private _init() {
      this.ngZone.runOutsideAngular(() => {
          this._hub = new signalR.HubConnectionBuilder()
              .withUrl(environment.pubSubHost)
              .withAutomaticReconnect()
              .configureLogging(signalR.LogLevel.Error)
              .build();

          this._hub
              .start()
              .then((_) => {
                console.log('[Pub Sub] Connection started');
              })
              .catch((err: any) => console.log('[Pub Sub] Error while starting connection: ' + err))
      });
  }

  private _initMessageReceiver() {
      this._messageSubject = new Subject<IPubSubMessage>();
      this.ngZone.runOutsideAngular(() => {
          this._hub?.on("PubSub", (data: any) => {
              this.ngZone.run(() => {
                  this._messageSubject?.next(data as IPubSubMessage);
              });
          });
      });
  }

  receiveMessage() {
      return this._messageSubject?.asObservable();
  }
}
