import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller.js';
import { HotelsService } from './hotels.service.js';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelSchema } from './schema/hotel.schema.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports:[
MongooseModule.forFeature([
 {
    name : 'Hotel',
    schema : HotelSchema
 }
]),
AuthModule,
],
  controllers: [HotelsController],
  providers: [HotelsService],
  exports:[HotelsModule]
})
export class HotelsModule {}
