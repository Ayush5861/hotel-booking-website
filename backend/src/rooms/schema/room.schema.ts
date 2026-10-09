import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type RoomDocument = HydratedDocument<Room>

@Schema()
export class Room{
@Prop({
    required:true,
})
type : string;
@Prop({
    required:true,
    min : 1,
})
capacity : number;
@Prop({
    required:true,
    min:500,
})
pricePerNight : number;
@Prop({
    required:true,
    min:1,
})
count : number;
@Prop({
    required:true,
    type:String,
})
hotelId : string;
}

export const RoomSchema = SchemaFactory.createForClass(Room)