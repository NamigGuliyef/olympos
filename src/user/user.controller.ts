import { Body, Controller, Get, HttpCode, HttpStatus, Put, UsePipes, ValidationPipe } from '@nestjs/common';
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

}
