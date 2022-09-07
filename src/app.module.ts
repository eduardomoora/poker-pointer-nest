import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersWsModule } from './users-ws/users-ws.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
      ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'public'),
      }),
      MongooseModule.forRoot('mongodb://localhost:27017/test-poker-new'),
      UsersWsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
