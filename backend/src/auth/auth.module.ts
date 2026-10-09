import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schema/user.schema.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guards/jwt-auth-guard.js';
import { RolesGuard } from './guards/roles.guard.js';



@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name : 'User',
        schema : userSchema
      }
    ]),
     JwtModule.registerAsync({
      inject: [ConfigService],

      useFactory: (
        configService: ConfigService,
      ) => ({
        secret:
          configService.get<string>(
            'JWT_SECRET',
          ),

        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtAuthGuard,RolesGuard],
  exports : [JwtModule , JwtAuthGuard,RolesGuard]
})
export class AuthModule {}
