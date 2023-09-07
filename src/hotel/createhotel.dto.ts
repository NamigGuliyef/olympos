import { IsNotEmpty, IsNumber, Matches } from 'class-validator';

export class createHotelDto {
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-z əüöğıçş]{3,100}$'))
  name: string;
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-z0-9,./ əüöğıçş-]{30,150}$'))
  location: string;
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-z,əüöğıçş ]{20,50}$'))
  destination_country: string;
  @IsNotEmpty()
  price: number;
  reviews: [string];
  @IsNotEmpty()
  description: string;
  // @IsNotEmpty()
  // photos: string[];
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
  air_conditioning: boolean;
  @IsNotEmpty()
  entertainment: boolean;
}
