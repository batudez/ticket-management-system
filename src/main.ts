import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist : true}));

  const config = new DocumentBuilder()
  .setTitle('Ticket Management API')
  .setDescription('API for managing tickets and notifications')
  .setVersion('1.0')
  .addTag('tickets')
  .build()

  const document = SwaggerModule.createDocument(app , config);
  SwaggerModule.setup('api',app,document)
  
  dotenv.config();
  app.use(cookieParser())
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
