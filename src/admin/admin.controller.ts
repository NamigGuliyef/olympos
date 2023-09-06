import { Body, Controller, Post, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import upload from 'src/config/multer';
import { createHotelDto } from 'src/hotel/createhotel.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('create-hotel')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('photos'))
  async createHotel(@Body() CreateHotelDto: createHotelDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    const hotel = await this.adminService.createHotel(CreateHotelDto)

    return hotel
  }



}
