import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tokenRequestType } from 'src/middleware/tokenRequsetType';
import { createUserDto } from './dto/createuser.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>, @Inject(REQUEST) private readonly req: tokenRequestType) { }

  async createUser(CreateUserDto: createUserDto): Promise<User> {
    const user = await this.userModel.create(CreateUserDto)
    return user
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email })
    return user
  }

  async getProfile(): Promise<User> {
    return this.userModel.findOne({ email: this.req.user.email }).select("-password")
  }


}
