import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tokenRequestType } from 'src/middleware/tokenRequsetType';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>, @Inject(REQUEST) private readonly req: tokenRequestType) { }

  
  async getProfile(): Promise<User> {
    return this.userModel.findOne({ email: this.req.user.email }).select("-password")
  }


}
