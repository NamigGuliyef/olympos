import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Hotel } from 'src/hotel/hotel.schema';
import { createReviewDto, updateReviewDto } from 'src/review/review.dto';
import { createWhishListDto } from 'src/whishlist/createWhishList.dto';
import { Whishlist } from 'src/whishlist/whishlist.schema';
import { updateUserDto } from './dto/updateuser.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(): Promise<User> {
    return await this.userService.getProfile();
  }

  @Put('/update-profile')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateProfile(@Body() UpdateUserDto: updateUserDto): Promise<string> {
    return this.userService.updateProfile(UpdateUserDto);
  }

  @Post('/create-whishlist')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async addWhishList(
    @Body() CreateWhishListDto: createWhishListDto,
  ): Promise<Whishlist> {
    return this.userService.addWhishList(CreateWhishListDto);
  }

  @Get('/whishlist')
  @HttpCode(HttpStatus.OK)
  async getAllWhishList(): Promise<Whishlist[]> {
    return this.userService.getAllWhishList();
  }

  @Get('/hotels')
  @HttpCode(HttpStatus.OK)
  async getAllHotels(): Promise<Hotel[]> {
    return await this.userService.getAllHotels()
  }

  @Post('/create-review')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createReview(@Body() CreateReviewDto: createReviewDto) {
    return this.userService.createReview(CreateReviewDto);
  }

  @Put('/update-review')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateReview(@Body() UpdateReviewDto: updateReviewDto) {
    return await this.userService.updateReview(UpdateReviewDto);
  }

  @Delete('/delete-review/:_id')
  @HttpCode(HttpStatus.OK)
  async deleteReview(@Param('_id') _id: string) {
    return await this.userService.deleteReview(_id);
  }
}
