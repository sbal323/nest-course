import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './messages/messages.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  app.useGlobalPipes(
    new ValidationPipe()
  );

  const config = new DocumentBuilder()
  .setTitle('Meggages API')
  .setDescription('The messages API description')
  .setVersion('1.0')
  //.addTag('cats')
  .build();

  // const options: SwaggerDocumentOptions =  {
  //   operationIdFactory: (
  //     controllerKey: string,
  //     methodKey: string
  //   ) => methodKey
  // };

  const document = SwaggerModule.createDocument(app, config); //, options);
  SwaggerModule.setup('swagger', app, document);


  await app.listen(3000);
}
bootstrap();
