import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('server')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

}
