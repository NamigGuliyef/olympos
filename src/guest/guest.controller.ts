import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { Hotel } from 'src/hotel/hotel.schema';
import { GuestService } from './guest.service';

@Controller()
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Get('/hotels')
  @HttpCode(HttpStatus.OK)
  async getAllHotels(): Promise<Hotel[]> {
    return await this.guestService.getAllHotels();
  }

  @Get('/hotels/:_id')
  @HttpCode(HttpStatus.OK)
  async getSingleHotel(@Param('_id') _id: string): Promise<Hotel> {
    return await this.guestService.getSingleHotel(_id);
  }
}
