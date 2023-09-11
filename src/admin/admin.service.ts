import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import cloudinary from 'src/cloudinary/cloudinary';
import { createHotelDto } from 'src/hotel/createhotel.dto';
import { Hotel } from 'src/hotel/hotel.schema';


@Injectable()
export class AdminService {
  constructor(@InjectModel('hotel') private hotelModel: Model<Hotel>) { }

  // create hotel
  async createHotel(CreateHotelDto: createHotelDto, files: Express.Multer.File[]): Promise<Hotel> {
    const hotelExist = await this.hotelModel.findOne({ name: CreateHotelDto.name })
    if (hotelExist) {
      throw new HttpException('The hotel has already been created', HttpStatus.CONFLICT)
    }
    const fileUrls = []
    for (let i = 0; i < files.length; i++) {
      const fileUrl = await cloudinary.uploader.upload(files[i].path, { public_id: files[i].originalname });
      fileUrls.push(fileUrl.url)
    }
    const hotel = await this.hotelModel.create({ ...CreateHotelDto, photos: fileUrls })
    return hotel
  }
}


