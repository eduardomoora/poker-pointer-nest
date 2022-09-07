import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { UsersWsService } from './users-ws.service';
import { CreateUsersWDto } from './dto/create-users-w.dto';
import { UpdateUsersWDto } from './dto/update-users-w.dto';
import {Server, Socket} from "socket.io";

@WebSocketGateway({ cors:true })
export class UsersWsGateway implements OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() webSocketServer: Server;
  constructor(private readonly usersWsService: UsersWsService) {}

  handleConnection(client: Socket, ...args: any[]) {
    console.log('Client connected', client.id);

  }

  async handleDisconnect(client: Socket) {
    console.log('Client disconnect', client.id);
    return await this.usersWsService.remove(this.webSocketServer,client.id);
  }

 /* @SubscribeMessage('userConnected')
  onConnectUser(client: Socket, @MessageBody() createUsersWDto: CreateUsersWDto) {
    const users = this.usersWsService.connectUser(client, createUsersWDto);
    this.webSocketServer.emit('user-points',users);
    return users;
  }*/

  @SubscribeMessage('userConnected')
  async onConnectUser(client: Socket,  payload: CreateUsersWDto) {
    console.log('payload',payload)
    const user = await  this.usersWsService.connectUser(client, payload, this.webSocketServer);
    return { data:{ user  }};
  }

  @SubscribeMessage('userLogout')
  async onLogout(client: Socket,  payload: string) {
    console.log('payload user log out',payload)
    const user = await  this.usersWsService.remove( this.webSocketServer, payload);
    return { data:{ user  }};
  }


  @SubscribeMessage('point')
  async onPoint(client: Socket,  payload: number) {
    console.log('payload user log out',payload)
    const user = await  this.usersWsService.point( this.webSocketServer,client, payload);
    return { data:{ user  }};
  }

  
  @SubscribeMessage('reset')
  async reset() {
    return  await  this.usersWsService.reset( this.webSocketServer);
  }

   @SubscribeMessage('showCards')
  async showCards() {
    return  await  this.usersWsService.showCards( this.webSocketServer);
  }
/*  @SubscribeMessage('createUsersW')
  create(@MessageBody() createUsersWDto: CreateUsersWDto) {
    return this.usersWsService.create(createUsersWDto);
  }

  @SubscribeMessage('findAllUsersWs')
  findAll() {
    return this.usersWsService.findAll();
  }

  @SubscribeMessage('findOneUsersW')
  findOne(@MessageBody() id: number) {
    return this.usersWsService.findOne(id);
  }

  @SubscribeMessage('updateUsersW')
  update(@MessageBody() updateUsersWDto: UpdateUsersWDto) {
    return this.usersWsService.update(updateUsersWDto.id, updateUsersWDto);
  }

  @SubscribeMessage('removeUsersW')
  remove(@MessageBody() id: number) {
    return this.usersWsService.remove(id);
  }*/
}
