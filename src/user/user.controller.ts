import { Body, Controller, Get, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { User } from './schema/user.schema';
import { UserService } from './user.service';
import { updateUserDto } from './dto/updateuser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(): Promise<User> {
    return this.userService.getProfile();
  }

  @Put('/update-profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(@Body () UpdateUserDto: updateUserDto): Promise<string> {
    return this.userService.updateProfile(UpdateUserDto);
  }
  
}
