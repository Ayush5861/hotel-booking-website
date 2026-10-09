import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoomDocument } from './schema/room.schema.js';
import { Model } from 'mongoose';
import { HotelDocument } from '../hotels/schema/hotel.schema.js';
import { createRoomDto } from './dto/create-room.dto.js';
import { updateRoomDto } from './dto/update-room.dto.js';

@Injectable()
export class RoomsService {
   constructor(
      @InjectModel('Room') private roomModel: Model<RoomDocument>,
      @InjectModel('Hotel') private hotelModel: Model<HotelDocument>
   ) { }

   async createRoom(hotelId: string, data: createRoomDto, ownerId: string) {
      const hotel = await this.hotelModel.findOne({ _id: hotelId })
      if (!hotel) {
         throw new NotFoundException('hotel not found')
      }
      if (hotel.ownerId !== ownerId) {
         throw new ForbiddenException('you are not authorized to create room in this hotel')
      }

      return await this.roomModel.create({ ...data, hotelId })
   }


   async getRoom(hotelId: string) {
       const hotel = await this.hotelModel.findById(hotelId);

  if (!hotel) {
    throw new NotFoundException('Hotel not found');
  }
      return this.roomModel.find({ hotelId: hotelId })
   }


   async getRoomById(roomId: string)
    { 
      const room = await this.roomModel.findOne({_id:roomId}); 
      if (!room)
          { throw new NotFoundException('Room not found'); } 
      return room;
    }

   async editRoom(roomId: string, data: updateRoomDto, ownerId: string) {
      const room = await this.roomModel.findOne({ _id: roomId })
      if (!room) {
         throw new NotFoundException('room not found')
      }
      const hotel = await this.hotelModel.findOne({ _id: room.hotelId })
      if (!hotel) {
         throw new NotFoundException('hotel not found')
      }
      if (hotel.ownerId !== ownerId) {
         throw new ForbiddenException('you are not authorized to edit this room')
      }
      Object.assign(room, data)
      return await room.save()

   }

   async deleteRoom(roomId: string, ownerId: string) {
      const room = await this.roomModel.findOne({ _id: roomId })
      if (!room) {
         throw new NotFoundException('room not found')
      }
      const hotel = await this.hotelModel.findOne({ _id: room.hotelId })
      if (!hotel) {
         throw new NotFoundException('hotel not found')
      }
      if (hotel.ownerId !== ownerId) {
         throw new ForbiddenException('you are not authorized to delete this room')
      }
      await this.roomModel.deleteOne({ _id: roomId })
      return {
         message: "room deleted successfully"
      }
   }






}
