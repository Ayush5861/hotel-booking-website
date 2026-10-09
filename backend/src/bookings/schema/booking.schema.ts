import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

@Schema({ timestamps: true })
export class Bookings {
  @Prop({ type: String, required: true })
  hotelId: string;

  @Prop({ type: String, required: true })
  roomId: string;

  @Prop({ type: String, required: true })
  guestId: string;

  @Prop({ type: String, required: true })
  name:string;

  @Prop({ type: Date, required: true })
  checkIn: Date;

  @Prop({ type: Date, required: true })
  checkOut: Date;

  @Prop({ type: Number, required: true, min: 1 })
  guests: number;

  @Prop({ type: Number, required: true, min: 0 })
  totalPrice: number;

  @Prop({
    type: String,
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;
}

export type BookingDocument = HydratedDocument<Bookings>;
export const BookingSchema = SchemaFactory.createForClass(Bookings);