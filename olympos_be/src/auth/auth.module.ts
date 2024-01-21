import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { hotelModel } from '../hotel/hotel.schema';
import { orderModel } from '../order/order.schema';
import { reviewModel } from '../review/review.schema';
import { tourModel } from '../tour/tour.schema';
import { userModel } from '../user/schema/user.schema';
import { UserController } from '../user/user.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { VerifyModel } from '../verify/verify_code.schema';
import { whishListModel } from '../whishlist/whishlist.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { tourCategoryModel } from '../tourCategory/tourcategory.schema';
import { hotelSpecificModel } from '../hotel-specifics/hotelspecific.schema';
import { subscribeModel } from '../subscribe/model/subscribe.schema';

@Module({
  imports: [UserModule, MongooseModule.forFeature([{ name: 'user', schema: userModel },
  { name: "verify", schema: VerifyModel }, { name: "whishlist", schema: whishListModel },
  { name: "review", schema: reviewModel }, { name: 'hotel', schema: hotelModel }, { name: "order", schema: orderModel },
  { name: "tour", schema: tourModel }, { name: "order", schema: orderModel}, { name: "tourcategory", schema: tourCategoryModel },{ name: "hotelspecific", schema: hotelSpecificModel },{ name: "subscribe", schema: subscribeModel }])],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService]
})
export class AuthModule { }
