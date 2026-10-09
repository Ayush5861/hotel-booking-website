import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { signupDto } from './dto/signup.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}
    

    @Post('signup')
    createUser(@Body() data:signupDto){
        return this.authService.registerUser(data);
    }

    @Post('login')
    loginUser(@Body() data:LoginDto){
        return this.authService.loginUser(data);
    }
}

