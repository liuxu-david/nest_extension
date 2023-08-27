import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import { isDev } from './utils/judge-env';
import { HttpExceptionFilter } from  "./utils/http-exception.filter"
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //设置接口前缀
  app.setGlobalPrefix('api');

  // 添加请求异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 接口文档配置
  if(isDev()) {
    const options = new DocumentBuilder()
      .setTitle('Extension Transsion Api Document')
      .setVersion('1.0.0')
      .addTag('文档')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }
  const port = app.get(ConfigService).get("NEST_SERVER_PORT")
  await app.listen(port);
  console.log('server is running on  localhost:5000'  + ' .✈️..✈️..✈️..✈️.. ');
}
bootstrap();
