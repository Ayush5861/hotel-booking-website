import { IsDateString, IsInt, Min, IsOptional } from 'class-validator';

export class UpdateBookingDto {
  @IsOptional()
  @IsDateString()
  checkIn?: string;

  @IsOptional()
  @IsDateString()
  checkOut?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  guests?: number;
}