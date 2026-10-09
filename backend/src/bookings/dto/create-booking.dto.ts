import {
  IsDateString,
  IsMongoId,
  IsInt,
  IsNotEmpty,
  Min,
  IsString,
} from 'class-validator';

export class CreateBookingDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  checkIn: string;

  @IsDateString()
  checkOut: string;

  @IsInt()
  @Min(1)
  guests: number;
}