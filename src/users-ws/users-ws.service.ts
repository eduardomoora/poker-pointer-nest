import {Injectable} from '@nestjs/common';
import {CreateUsersWDto} from './dto/create-users-w.dto';
import {UpdateUsersWDto} from './dto/update-users-w.dto';
import {UsersW} from "./entities/users-w.entity";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Server, Socket} from "socket.io";
@Injectable()
export class UsersWsService {
  constructor(
      @InjectModel(UsersW.name)
      private readonly userModel: Model<UsersW>,
  ){

  }
  async create(createUsersWDto: CreateUsersWDto) {
    try{
      // const pokemon = await this.pokemonModel.create(createPokemonDto);

      return await this.userModel.create(createUsersWDto);
    }
   catch (err){

   }
  }

  async findAll() {
    try {
    return await this.userModel.find();
    }
    catch (err) {}
  }

  findOne(id: number) {
    return `This action returns a #${id} usersW`;
  }

  update(id: number, updateUsersWDto: UpdateUsersWDto) {
    return `This action updates a #${id} usersW`;
  }

  async remove(server: Server,socketId: string) {
    try{
      await this.userModel.findOneAndDelete({socketId});
      const users =  await this.findAll()
      server.emit('users',users);
      return
    }
    catch (err){

    }
  }

  async connectUser(client: Socket, createUsersWDto: CreateUsersWDto, server: Server):Promise<any>{
    const user: CreateUsersWDto = {
      ...createUsersWDto,
      points: null,
      socketId: client.id
    }
    try {
      const newUser = new this.userModel({ ...user });
      const userDb = await newUser.save();
      const users =  await this.findAll()
      server.emit('users',users)
      return userDb;

    } catch (err) {

    }
  }

  async point(webSocketServer: Server, client: Socket, payload: number) {
    try {
     const updated = await this.userModel.updateOne({socketId: client.id },{points: payload })
     console.log('update user', updated);
      const users =  await this.findAll();
      console.log('before',users)
      webSocketServer.emit('users', users);
    }
    catch(err){
      console.log(err)
    }

  }

  async reset(webSocketServer: Server) {
    try { 
      await this.userModel.updateMany({ points: null });
      const users =  await this.findAll();
      webSocketServer.emit('users', users);
      webSocketServer.emit('showCards', false);
    }
    catch(err){
      console.log(err)
    }

  }

  
  async showCards(webSocketServer: Server) {
    try { 
  
      webSocketServer.emit('showCards', true);
    }
    catch(err){
      console.log(err)
    }

  }
}
