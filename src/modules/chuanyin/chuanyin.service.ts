import { Inject, Injectable, Logger } from '@nestjs/common';
import { WebSocketGateway,WebSocketServer } from '@nestjs/websockets'
import { ConfigService } from '@nestjs/config';
import * as WebSocket from 'ws';

@Injectable()
export class ChuanyinService {
  private readonly logger = new Logger(ChuanyinService.name);
  @Inject(ConfigService) private readonly configServer:ConfigService;

  async fetchMeetingData(){

    return "oko"
  }
}
