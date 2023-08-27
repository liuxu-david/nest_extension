import { Module } from '@nestjs/common';
import { ChuanyinService } from './chuanyin.service';
import { ChuanyinController } from './chuanyin.controller';

@Module({
  imports: [],
  controllers: [ChuanyinController],
  providers: [ChuanyinService],
})
export class ChuanyinModule {}
