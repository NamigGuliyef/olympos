import { IsNotEmpty, Matches } from 'class-validator';

export class createHotelDto {
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-z əüöğıçşƏÜÖĞIÇŞ]{3,100}$'))
  name: string;
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-z0-9əüöğıçşƏÜÖĞIÇŞ,./ ]{20,150}$'))
  location: string;
  @IsNotEmpty()
  @Matches(new RegExp('^[A-Za-z,əüöğıçş ]{15,50}$'))
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
