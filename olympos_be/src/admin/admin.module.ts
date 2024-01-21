import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from '../user/schema/user.schema';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { hotelModel } from '../hotel/hotel.schema';
import { tourModel } from '../tour/tour.schema';
import { orderModel } from '../order/order.schema';
import { tourCategoryModel } from '../tourCategory/tourcategory.schema';
import { hotelSpecificModel } from '../hotel-specifics/hotelspecific.schema';
import { subscribeModel } from '../subscribe/model/subscribe.schema';
import { whishListModel } from '../whishlist/whishlist.schema';
import { reviewModel } from '../review/review.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "user", schema: userModel }, { name: "hotel", schema: hotelModel },
  { name: "tour", schema: tourModel }, { name: "order", schema: orderModel }, { name: "user", schema: userModel },
  { name: "tourcategory", schema: tourCategoryModel }, { name: "hotelspecific", schema: hotelSpecificModel }, { name: "subscribe", schema: subscribeModel },
  { name: "whishlist", schema: whishListModel }, { name: "review", schema: reviewModel }])],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule { }
