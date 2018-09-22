// Source ==> https://github.com/TR-API-Samples/Example.EWA.TypeScript.WebApplication

export class SocketService {
  socket: any = null;

  private socketUrl = "ws://localhost:12345/chat";  // URL to web api
  
  //Initiate WebSocket connection
  connectWebSocket(): void {
    this.socket = new WebSocket(this.socketUrl);
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

  //Create the Login JSON message from LoginMsg class and send it to ADS WebSocket
  sendLogin(username: string): void {
    this.socket.send(JSON.stringify({name: username}));
  }
  
}


