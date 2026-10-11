import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, userRole } from '../auth/schema/user.schema.js';
import { HotelDocument } from '../hotels/schema/hotel.schema.js';
import { BookingDocument } from '../bookings/schema/booking.schema.js';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel('User') private userModel : Model<UserDocument>,
        @InjectModel('Hotel') private hotelModel : Model<HotelDocument>,
        @InjectModel('Bookings') private bookingsModel : Model<BookingDocument>
    ){}
   async getAllUsers(){
     return await this.userModel.find().select('-password').exec()
    }

    async deleteUser(userId:string){
       const user =  await this.userModel.findById(userId)
       if(!user){
        throw new NotFoundException('user not found')
       }
       if(user.role===userRole.admin){
           throw new ForbiddenException('you cannot delete admin')
       }
      await this.userModel.findByIdAndDelete(userId)
        return {
         message: "user deleted successfully"
      }
    }

    async getAllHotel(){
       return await this.hotelModel.find()
    }

    async deleteHotel(hotelId:string){
        const hotel = await this.hotelModel.findById(hotelId)
         if(!hotel){
      throw new NotFoundException('Hotel not found');
    }
    await this.hotelModel.findByIdAndDelete(hotelId);
      return{
    message: 'Hotel deleted successfully',
    
    }
    }

  async getHotelWiseBookings(hotelId: string) {
  const bookings = await this.bookingsModel.find({ hotelId });

  const hotel = await this.hotelModel.findById(hotelId);

  return {
    hotelName: hotel?.name,
    bookings,
  };
}
}
