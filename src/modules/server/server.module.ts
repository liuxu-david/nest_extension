import { Module } from '@nestjs/common';
import { EzService } from './server.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule,ConfigModule],
  providers: [EzService],
  exports: [EzService],
})
export class EzModule {}