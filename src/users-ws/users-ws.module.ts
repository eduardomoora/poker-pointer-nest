import { Module } from '@nestjs/common';
import { UsersWsService } from './users-ws.service';
import { UsersWsGateway } from './users-ws.gateway';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema, UsersW} from "./entities/users-w.entity";

@Module({
  imports:[
      MongooseModule.forFeature([
    {
      name: UsersW.name,
      schema: UserSchema,
    },
  ]),],
  providers: [UsersWsGateway, UsersWsService]
})
export class UsersWsModule {}
