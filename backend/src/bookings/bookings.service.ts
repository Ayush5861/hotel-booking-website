import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookingDocument, BookingStatus } from './schema/booking.schema.js';
import { HotelDocument } from '../hotels/schema/hotel.schema.js';
import { RoomDocument } from '../rooms/schema/room.schema.js';
import { CreateBookingDto } from './dto/create-booking.dto.js';

import { UpdateBookingDto } from './dto/update-booking.dto.js';

@Injectable()
export class BookingsService {
      constructor(
    @InjectModel('Booking') private bookingModel: Model<BookingDocument>,
    @InjectModel('Hotel') private hotelModel: Model<HotelDocument>,
    @InjectModel('Room') private roomModel: Model<RoomDocument>,
  ) {}

  //create bookings
  async createBooking(hotelId : string , roomId : string , data : CreateBookingDto , guestId : string ){
   const checkIn = new Date(data.checkIn);
   const checkOut = new Date(data.checkOut);
   if (checkIn >= checkOut)
     { 
        throw new BadRequestException( 'Check-out must be after check-in', );
     } 
     const hotel = await this.hotelModel.findById(hotelId);
      if (!hotel) {
         throw new NotFoundException('Hotel not found');
         }
       const room = await this.roomModel.findOne({ _id: roomId, hotelId, });
        if (!room) {
             throw new NotFoundException('Room not found'); 
            }
         if (data.guests > room.capacity) 
            { 
                throw new BadRequestException( 'Guests exceed room capacity', );
             } 
         const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24), ); 
         const totalPrice = nights * room.pricePerNight;
          return this.bookingModel.create({
             hotelId, roomId, guestId, name: data.name, checkIn, checkOut, guests: data.guests, totalPrice, status: BookingStatus.PENDING,
             });
  }
  
  //ek guest ke saare bookings jitne bhi usne kre hain
async getUserBookings(guestId: string) {
  return this.bookingModel.find({ guestId }).sort({ createdAt: -1 });
}

//ek owner ke hotel me kitne bookings
async getHotelBookings(hotelId: string, ownerId: string) {
  const hotel = await this.hotelModel.findById(hotelId);

  if (!hotel) {
    throw new NotFoundException('Hotel not found');
  }

  if (hotel.ownerId !== ownerId) {
    throw new BadRequestException('You do not own this hotel');
  }

  return this.bookingModel.find({ hotelId }).sort({ createdAt: -1 });
}

//ek owner ke hotels ke kis room me kitne booking
async getRoomBookings(roomId: string, ownerId: string) {
  const room = await this.roomModel.findById(roomId);

  if (!room) {
    throw new NotFoundException('Room not found');
  }

  const hotel = await this.hotelModel.findById(room.hotelId);

  if (!hotel) {
    throw new NotFoundException('Hotel not found');
  }

  if (hotel.ownerId !== ownerId) {
    throw new BadRequestException('You do not own this hotel');
  }

  return this.bookingModel.find({ roomId }).sort({ createdAt: -1 });
}

//update booking
async updateBookings(bookingId:string ,data:UpdateBookingDto, guestId:string){
 const booking = await this.bookingModel.findOne({_id: bookingId })
 if(!booking){
  throw new NotFoundException('booking not found')
 }
 if(booking.guestId !== guestId){
  throw new ForbiddenException('Edit your own bookings')
 }
  if (booking.status === BookingStatus.CANCELLED || booking.status === BookingStatus.COMPLETED) {
    throw new BadRequestException('This booking cannot be edited');
  }

 const checkIn = data.checkIn? new Date(data.checkIn) : new Date(booking.checkIn)
  const checkOut = data.checkOut? new Date(data.checkOut) : new Date(booking.checkOut)

    if (checkIn >= checkOut) {
      throw new BadRequestException('Check-out must be after check-in');
    }

    const room = await this.roomModel.findOne({_id:booking.roomId})
    if(!room){
       throw new NotFoundException('Room not found');
    }
    if(data.guests!==undefined && data.guests>room.capacity){
        throw new BadRequestException('Guests exceed room capacity');
    }


    const nights = Math.ceil((checkOut.getTime()-checkIn.getTime())/24*60*60*1000)
  

  Object.assign(booking, {...data , totalPrice : nights*room.pricePerNight});
  return await booking.save();
}


//cancel booking
async cancelBooking(bookingId : string , guestId : string){
  const booking = await this.bookingModel.findOne({_id: bookingId })
 if(!booking){
  throw new NotFoundException('booking not found')
 }
 if(booking.guestId !== guestId){
  throw new ForbiddenException('delete your own bookings')
 }
 booking.status = BookingStatus.CANCELLED;
 return await booking.save()
}
}
