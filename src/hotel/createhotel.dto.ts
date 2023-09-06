import { IsNotEmpty, IsNumber, Matches } from 'class-validator';

export class createHotelDto {
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-z]{3,100}$'))
  name: string;
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-z0-9,.-/ ]{30,150}$'))
  location: string;
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-z, ]{20,50}$'))
  destination: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @IsNotEmpty()
  reviews: [string];
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  photos: [string];
  @IsNotEmpty()
  map: string;
  @IsNotEmpty()
  breakfast: boolean;
  @IsNotEmpty()
  parking: boolean;
  @IsNotEmpty()
  pool: boolean;
  @IsNotEmpty()
  wifi: boolean;
  @IsNotEmpty()
  air: boolean;
  @IsNotEmpty()
  entertainment: boolean;
}
