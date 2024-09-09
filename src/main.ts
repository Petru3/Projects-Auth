import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config'
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger  = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
 
  const port = serverConfig.port;
  await app.listen(3000);
  logger.log(`Application succesfully deployed on the port ${port}!`)
}
bootstrap();
