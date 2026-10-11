import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller.js';
import { AdminService } from './admin.service.js';
import { userSchema } from '../auth/schema/user.schema.js';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module.js';
import { HotelSchema } from '../hotels/schema/hotel.schema.js';
import { BookingSchema } from '../bookings/schema/booking.schema.js';

@Module({
  imports:[
    MongooseModule.forFeature([
 {name:'User' , schema : userSchema},
 {name:'Hotel' , schema : HotelSchema},
 {name:'Bookings' , schema : BookingSchema}
    ]),
  
AuthModule
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
