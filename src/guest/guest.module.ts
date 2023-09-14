import { Module } from '@nestjs/common';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';
import { MongooseModule } from '@nestjs/mongoose';
import { hotelModel } from 'src/hotel/hotel.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'hotel', schema: hotelModel }])],
  controllers: [GuestController],
  providers: [GuestService],
})
export class GuestModule {}
