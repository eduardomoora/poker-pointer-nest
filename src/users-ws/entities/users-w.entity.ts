
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UsersW extends Document {
    @Prop({
        unique: true,
        index: true,
    })
    name: string;

    @Prop()
    points: number;


    @Prop()
    room: number;

    @Prop()
    socketId: string;
}

export const UserSchema = SchemaFactory.createForClass(UsersW);
