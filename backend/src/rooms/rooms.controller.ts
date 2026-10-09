import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service.js';
import type { createRoomDto } from './dto/create-room.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth-guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { userRole } from '../auth/schema/user.schema.js';
import { Roles } from '../auth/decorator/role.decorator.js';
import type {updateRoomDto} from './dto/update-room.dto.js';
@UseGuards(JwtAuthGuard)
@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomService: RoomsService ){}
    

    @UseGuards(RolesGuard)
    @Roles(userRole.owner)
    @Post(':hotelId')
createRoom(
  @Param('hotelId') hotelId: string,
  @Body() data: createRoomDto,
  @Req() req: any,
){
    return this.roomService.createRoom(hotelId,data,req.user.id)
}

@Get('detail/:roomId') 
getRoomById(@Param('roomId') roomId: string)
 { return this.roomService.getRoomById(roomId); }

 @Get(':hotelId')
  getRoom(@Param('hotelId') hotelId: string)
   { return this.roomService.getRoom(hotelId); }


@UseGuards(RolesGuard)
@Roles(userRole.owner)
@Patch(":id")
editRoom(@Param('id') roomId:string, @Body() data:updateRoomDto , @Req() req:any ){
return this.roomService.editRoom(roomId , data , req.user.id)
}

@UseGuards(RolesGuard)
@Roles(userRole.owner)
@Delete(":id")
deleteRoom(@Param("id") roomId:string , @Req() req:any){
return this.roomService.deleteRoom(roomId , req.user.id)
}
  
}
