import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './schema/user.schema.js';
import { Model } from 'mongoose';
import { signupDto } from './dto/signup.dto.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto.js';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User')
    private userModel: Model<UserDocument>,
        private JwtService: JwtService
    ){}
    
    async registerUser(data : signupDto){
        // console.log(data);
        const user = await this.userModel.findOne({email:data.email})
        if(user){
            return {
                message:"user already exist"
            }
        }
        const hashedPassword = await bcrypt.hash(data.password,10)
        const newUser = await this.userModel.create({...data , password:hashedPassword})
        // console.log(newUser)
        // const token = await this.JwtService.sign({id:newUser._id})
        return {
            message : " user created successfully",
            // token : token,
            user :{
                userId : newUser._id,
                name : newUser.name,
                email : newUser.email
            }
        }
           }
    async loginUser(data : LoginDto){
       const user = await this.userModel.findOne({email:data.email})
         if (!user) {
    throw new UnauthorizedException("User with this email does not exist");
  }
        const passwordCheck = await bcrypt.compare(data.password , user.password)
      if (!passwordCheck) {
    throw new UnauthorizedException("Invalid password");
  }
       const token = this.JwtService.sign({id:user._id,role:user.role})
        return{
            message:"login successfully",
            token,
            user :{
                userId : user._id,
                name : user.name,
                email : user.email,
                role: user.role
            }
        }
    }
 }
        