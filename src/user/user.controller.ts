import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(): Promise<User> {
    return this.userService.getProfile()
  }


}
