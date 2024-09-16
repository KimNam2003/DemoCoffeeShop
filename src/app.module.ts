import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userModule } from './database/users/service/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from 'ormconfig';
import { UsersService } from './database/users/service/user.sevice';
import { productModule } from './database/products/product.module';
import { CurrentMiddleware } from './database/users/middleware/current-user.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [TypeOrmModule.forRoot({
    ...DatabaseConfig,
    autoLoadEntities :true,
    logging: true
     
   }),userModule, productModule,
   ServeStaticModule.forRoot({
    rootPath: join(process.cwd(), 'public'),
  })],
  controllers: [AppController,],
  providers: [AppService],

  

})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentMiddleware)
      .forRoutes('*');
  }
}
