import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorator/role.decorator.js';
import { userRole } from '../auth/schema/user.schema.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.js';

@Controller('admin')
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles(userRole.admin)
export class AdminController {
    constructor(private readonly adminService : AdminService,
    ){}
      @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Delete('users/:userId')
  deleteUser(@Param('userId') userId: string) {
    return this.adminService.deleteUser(userId);
  }

  @Get('hotels')
  getAllHotel() {
    return this.adminService.getAllHotel();
  }

  @Delete('hotels/:hotelId')
  deleteHotel(@Param('hotelId') hotelId: string) {
    return this.adminService.deleteHotel(hotelId);
  }
 @Get('bookings/:hotelId')
getHotelWiseBookings(@Param('hotelId') hotelId: string) {
  return this.adminService.getHotelWiseBookings(hotelId);
}
}
