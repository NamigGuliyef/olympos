import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createWhishListDto } from 'src/whishlist/createWhishList.dto';
import { updateUserDto } from './dto/updateuser.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';
import { Whishlist } from 'src/whishlist/whishlist.schema';

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
}
