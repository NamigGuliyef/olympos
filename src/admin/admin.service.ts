import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createHotelDto } from 'src/hotel/createhotel.dto';
import { Hotel } from 'src/hotel/hotel.schema';
import cloudinary from 'src/config/cloudinary';


@Injectable()
export class AdminService {
  constructor(@InjectModel('hotel') private hotelModel: Model<Hotel>) { }

  // create hotel
  async createHotel(CreateHotelDto: createHotelDto, files: any): Promise<Hotel> {
    const hotelExist = await this.hotelModel.findOne({ name: CreateHotelDto.name })
    if (hotelExist) {
      throw new HttpException('The hotel has already been created', HttpStatus.CONFLICT)
    }
    const data = await cloudinary.uploader.upload(files.path, { public_id: files.originalname })
    const hotel = await this.hotelModel.create({ photos: data.url, ...CreateHotelDto })
    return hotel
  }
}
