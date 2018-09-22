// Source ==> https://github.com/TR-API-Samples/Example.EWA.TypeScript.WebApplication

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: any = null;

  private socketUrl = "ws://localhost:12345/chat?userid=";  // URL to web api
  
  //Initiate WebSocket connection
  connectWebSocket(userId: number): void {
    console.log(this.socketUrl + String(userId))
    this.socket = new WebSocket(this.socketUrl + String(userId));
    this.socket.onopen = this.onOpen;
    this.socket.onmessage = this.onMessage;
    this.socket.onerror = this.onError;
    this.socket.onclose = this.onClose;
  }

  //indicates that the connection is ready to send and receive data
  onOpen(event: any): void {
    console.log("Connected the WebSocket");
  }

  //An event listener to be called when a message is received from the server
  onMessage(event: any): void {
    console.log("WebSocket Response");
    console.log(JSON.parse(event.data));
  }

  //An event listener to be called when an error occurs. This is a simple event named "error".
  onError(event: any): void {
    console.log(JSON.stringify(event.data));
  }

  //An event listener to be called when the WebSocket connection's readyState changes to CLOSED.
  onClose(event: any): void {
    console.log(JSON.stringify(event.data));
  }

  //----------------------------------- Application Logic Code ------------------------

  //Send Graphics details
  sendGraphicsDetails(userId: number, shapeId: number, colorId: number): void {
    console.log({user_id: userId, shape_id: shapeId, color_id: colorId});
    this.socket.send(JSON.stringify({user_id: userId, shape_id: shapeId, color_id: colorId}));
  }
  
}


