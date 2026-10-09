import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller.js';
import { RoomsService } from './rooms.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelsModule } from '../hotels/hotels.module.js';
import { HotelSchema } from '../hotels/schema/hotel.schema.js';
import { RoomSchema } from './schema/room.schema.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
   imports: [
    MongooseModule.forFeature([
      { name: 'Room', schema: RoomSchema },
      { name: 'Hotel', schema: HotelSchema },
    ]),
    AuthModule
  ],
  controllers: [RoomsController],
  providers: [RoomsService]
})
export class RoomsModule {}
