import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type UserDocument = HydratedDocument<User>;
export enum userRole {
  guest = 'guest',
  owner = 'owner',
  admin = 'admin',
}
@Schema()
export class User{
    @Prop({
     required:true
    })
    name:string;
     @Prop({
     required:true,
     unique:true
    })
    email:string;
     @Prop({
      required:true,
      minlength:6
    })
    password:string; 
    @Prop({
    required: true,
    enum: userRole,
    default: userRole.guest,
  })
  role: string;
}

export const userSchema = SchemaFactory.createForClass(User);