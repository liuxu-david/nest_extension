import { Module } from '@nestjs/common';
import { ChuanyinModule } from './modules/chuanyin/chuanyin.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { CacheModule } from './modules/cache/cache.module';
import devConfig from "./config/dev.config"
import prodConfig from  "./config/prod.config"
import {isDev} from  "./utils/judge-env"
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { WebsocketGateway } from './modules/websocket/websocket.gateway';
import { EzModule } from './modules/server/server.module';

@Module({
  imports: [
    ...setupModules(),
    TasksModule,
    ChuanyinModule,
    CacheModule,
    EzModule,
    WebsocketGateway,
  ],
})
export class AppModule {}

function setupModules() {
  const _configModule = ConfigModule.forRoot({
    isGlobal: true,
    load: [isDev() ? devConfig : prodConfig]
  });

  const _scheduleModdle = ScheduleModule.forRoot();

  return [_configModule, _scheduleModdle]
}