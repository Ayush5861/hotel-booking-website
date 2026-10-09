import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type HotelDocument = HydratedDocument<Hotel>

@Schema()
export class Hotel{
    @Prop({
      required:true,
       trim: true,  
    })
    name : string;
     @Prop({
      required:true,
       trim: true,  
    })
    city : string;
     @Prop({
      required:true, 
       trim: true, 
    })
    area : string;
     @Prop({
      required:true,  
       trim: true,
    })
    address : string;
     @Prop({
      required:true,  
    })
    description : string;
     @Prop({
      type:[String],
      default : []
    })
    amenities : string[]; 
     @Prop({
      required:true,  
    })
    ownerId : string;
}
export const HotelSchema =
  SchemaFactory.createForClass(Hotel);