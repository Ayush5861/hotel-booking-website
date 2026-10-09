import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { HotelsService } from './hotels.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorator/role.decorator.js';
import { userRole } from '../auth/schema/user.schema.js';
import { createHotelDto } from './dto/create-hotel.dto.js';
import { updateHotelDto } from './dto/update-hotel.dto.js';

@Controller('hotels')
@UseGuards(JwtAuthGuard)
export class HotelsController {
    constructor(private readonly hotelService : HotelsService){}

    @Get()
    getHotel(@Req() req:any){
        return this.hotelService.getHotel(req.user.id , req.user.role)
    }

    @Get(':id')
    getHotelById(@Param('id') id:string){
     return this.hotelService.getHotelById(id);
    }
    @Post()
    @UseGuards(RolesGuard)
    @Roles(userRole.owner)
    createHotel(@Body() data:createHotelDto , @Req() req:any){
        return this.hotelService.createHotel(data, req.user.id)
    }
    
    @Patch(':id')
    @UseGuards(RolesGuard)
    @Roles(userRole.owner)
    editHotel(@Body() data:updateHotelDto , @Req() req:any , @Param('id') id:string){
        return this.hotelService.editHotel(data,req.user.id,id)
    }

    @Delete(':id')
        @UseGuards(RolesGuard)
    @Roles(userRole.owner)
    deleteHotel(@Req() req:any , @Param('id') id:string){
        return this.hotelService.deleteHotel(req.user.id , id)
    }

}
