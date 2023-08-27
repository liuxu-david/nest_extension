import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { WebSocket } from 'ws';

@WebSocketGateway()
export class WebsocketGateway{
  @WebSocketServer()

  afterInit() {
    console.log('OnGatewayInit');
    const websocket = new WebSocket('wss://uat-paas.transsion.com/gl-meeting-backstage/roomsLIst?meetRoomCode=U0gtMTExLTAjNUYtNS01NTVYSFlT');
    websocket.onopen = () => {
      console.log('Socket reconnected');
    };

    websocket.onclose = () => {
      console.log('Socket reconnection closed');
    };
  }

  handleConnection() {
    console.log('OnGatewayConnection');
  }

  handleDisconnect() {
    console.log('OnGatewayDisconnect');
  }


}