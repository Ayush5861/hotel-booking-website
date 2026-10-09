import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller.js';
import { BookingsService } from './bookings.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingSchema } from './schema/booking.schema.js';
import { HotelSchema } from '../hotels/schema/hotel.schema.js';
import { RoomSchema } from '../rooms/schema/room.schema.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
    imports: [
    MongooseModule.forFeature([
      { name: 'Booking', schema: BookingSchema },
      { name: 'Hotel', schema: HotelSchema },
      { name: 'Room', schema: RoomSchema},
    ]),
    AuthModule
  ],
  controllers: [BookingsController],
  providers: [BookingsService]
})
export class BookingsModule {}
