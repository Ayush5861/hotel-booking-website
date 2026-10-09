import { ForbiddenException, Injectable } from '@nestjs/common';
import { HotelDocument } from './schema/hotel.schema.js';
import { Model } from 'mongoose';
import { createHotelDto } from './dto/create-hotel.dto.js';
import { updateHotelDto } from './dto/update-hotel.dto.js';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class HotelsService {
    constructor(
           @InjectModel('Hotel')
        private readonly hotelModel:Model<HotelDocument>
    ){}


    async getHotel(userId : string , role:string){
        if(role==='owner'){
            return await this.hotelModel.find({ownerId:userId})
        }
         return await this.hotelModel.find();
    }

    async getHotelById(id:string){
        return await this.hotelModel.findOne({_id:id});
    }


    async createHotel(data : createHotelDto , id : string){
    return await this.hotelModel.create({
        ...data,
        
        ownerId: id,
    })
    }

    async editHotel(data:updateHotelDto , ownerId:string , id : string){
        const hotel = await this.hotelModel.findOne({_id:id})
        if(!hotel){
            return {
                message : "hotel not found"
            }
        }
        if(hotel.ownerId != ownerId){
          throw new ForbiddenException('You are not allowed to edit this hotel. Please edit your own hotel')
        }
        Object.assign(hotel,data)
        return await hotel.save()
        
    }

    async deleteHotel(ownerId : string , id:string){
        const hotel = await this.hotelModel.findOne({_id:id})
        if(!hotel){
            return {
                message : "hotel not found"
            }
        }
         if(hotel.ownerId != ownerId){
          throw new ForbiddenException('You are not allowed to delete this hotel. Please delete your own hotel')
        }
        await this.hotelModel.deleteOne({_id:id})
        return {
    message: 'hotel deleted successfully'
};
    }
}
