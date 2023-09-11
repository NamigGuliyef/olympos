import { Body, Controller, Post, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from 'src/cloudinary/multer';
import { createHotelDto } from 'src/hotel/createhotel.dto';
import { Hotel } from 'src/hotel/hotel.schema';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('/create-hotel')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('photos', 10, MulterOptions))
  async createHotel(@Body() CreateHotelDto: createHotelDto, @UploadedFiles() files: Express.Multer.File[]): Promise<Hotel> {
    return await this.adminService.createHotel(CreateHotelDto, files)
  }

}
