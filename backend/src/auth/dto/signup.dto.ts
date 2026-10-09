import { IsEmail, IsIn, IsNotEmpty, IsString, MinLength } from "class-validator";

export class signupDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @MinLength(6)
  password: string;
  @IsString()
  @IsNotEmpty()
  @IsIn(['owner','guest'])
  role:string
}