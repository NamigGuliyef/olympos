import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { hotelModel } from '../hotel/hotel.schema';
import { tourModel } from '../tour/tour.schema';
import { tourCategoryModel } from '../tourCategory/tourcategory.schema';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';
import { hotelSpecificModel } from '../hotel-specifics/hotelspecific.schema';
import { subscribeModel } from '../subscribe/model/subscribe.schema';
import { reviewModel } from '../review/review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      
      { name: 'hotel', schema: hotelModel },
      { name: 'tour', schema: tourModel },
      { name: 'tourcategory', schema: tourCategoryModel },
      { name: 'hotelspecific', schema: hotelSpecificModel },
      { name: 'subscribe', schema: subscribeModel },
      { name: 'review', schema: reviewModel }

    ]),
  ],
  controllers: [GuestController],
  providers: [GuestService],
})
export class GuestModule { }
