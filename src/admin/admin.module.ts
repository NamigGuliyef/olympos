import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from 'src/user/schema/user.schema';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { hotelModel } from 'src/hotel/hotel.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "user", schema: userModel },{ name: "hotel", schema: hotelModel }])],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule { }
