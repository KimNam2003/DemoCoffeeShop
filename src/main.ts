import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { InterceptorsConsumer } from '@nestjs/core/interceptors';
import * as session from 'express-session';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.useGlobalPipes(new ValidationPipe());
   app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
   app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
    await app.listen(3000);
}
bootstrap();
