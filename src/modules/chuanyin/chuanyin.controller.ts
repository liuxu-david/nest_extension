import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ChuanyinService } from './chuanyin.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("chuanyin")
@Controller('chuanyin')
export class ChuanyinController {
  constructor(private readonly chuanyinService: ChuanyinService) {}

  @Get("/init")
  findById() {
    return this.chuanyinService.fetchMeetingData()
  }
}
