import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel } from 'src/hotel/hotel.schema';

@Injectable()
export class GuestService {
  constructor(
    @InjectModel('hotel') private readonly hotelModel: Model<Hotel>,
  ) {}

  // get All hotels
  async getAllHotels(): Promise<Hotel[]> {
    return await this.hotelModel.find();
  }

  // get single hotel
  async getSingleHotel(_id: string): Promise<Hotel> {
    return await this.hotelModel
      .findOne({ _id })
      .populate([{ path: 'reviews', select: 'description' }]);
  }
}
