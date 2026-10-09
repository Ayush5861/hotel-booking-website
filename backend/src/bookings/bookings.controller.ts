import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service.js';
import { CreateBookingDto } from './dto/create-booking.dto.js';

import { RolesGuard } from '../auth/guards/roles.guard.js';
import { userRole } from '../auth/schema/user.schema.js';
import { Roles } from '../auth/decorator/role.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.js';
import { UpdateBookingDto } from './dto/update-booking.dto.js';

@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService : BookingsService){}
    @UseGuards(RolesGuard)
    @Roles(userRole.guest)
    @Post(':hotelId/:roomId')
    createBooking(
  @Param('hotelId') hotelId: string,
  @Param('roomId') roomId: string,
  @Body() data: CreateBookingDto,
  @Req() req: any,
) {
  return this.bookingsService.createBooking(
    hotelId,
    roomId,
    data,
    req.user.id,
  );
}
 @UseGuards(RolesGuard)
  @Roles(userRole.guest)
@Get('my')
getUserBookings(@Req() req: any) {
  return this.bookingsService.getUserBookings(req.user.id);
}

@UseGuards(RolesGuard)
@Roles(userRole.owner)
@Get('hotel/:hotelId')
getHotelBookings(
  @Param('hotelId') hotelId: string,
  @Req() req: any,
) {
  return this.bookingsService.getHotelBookings(
    hotelId,
    req.user.id,
  );
}

@UseGuards(RolesGuard)
@Roles(userRole.owner)
@Get('room/:roomId')
getRoomBookings(
  @Param('roomId') roomId: string,
  @Req() req: any,
) {
  return this.bookingsService.getRoomBookings(
    roomId,
    req.user.id,
  );
}

@UseGuards(RolesGuard)
@Roles(userRole.guest)
@Patch(":bookingId")
updateBookings(@Param('bookingId') bookingId:string, @Body() data:UpdateBookingDto , @Req() req:any){
return this.bookingsService.updateBookings(bookingId,data,req.user.id)
}

@UseGuards(RolesGuard)
@Roles(userRole.guest)
@Delete(":bookingId")
cancelBooking(@Param('bookingId') bookingId:string , @Req() req:any){
  return this.bookingsService.cancelBooking(bookingId , req.user.id)
}


}
