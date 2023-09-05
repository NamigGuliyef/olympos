import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { Model } from 'mongoose';
import { tokenRequestType } from 'src/middleware/tokenRequestType';
import { Whishlist } from 'src/whishlist/whishlist.schema';
import { updateUserDto } from './dto/updateuser.dto';
import { User } from './schema/user.schema';
import { createWhishListDto } from 'src/whishlist/createWhishList.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private userModel: Model<User>,
    @InjectModel('whishlist') private whishListModel: Model<Whishlist>,
    @Inject(REQUEST) private readonly req: tokenRequestType) { }

  // get Profile
  async getProfile(): Promise<User> {
    const user = await this.userModel.findOne({ email: this.req.user.email }).select('-password');
    return user
  }

  // update profile
  async updateProfile(UpdateUserDto: updateUserDto): Promise<string> {
    const userExist = await this.userModel.findOne({ email: this.req.user.email });
    if (!userExist) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!UpdateUserDto.old_password) {
      await this.userModel.findOneAndUpdate({ email: this.req.user.email }, { $set: UpdateUserDto }, { new: true })
      return 'Changed profile information'
    } else {
      const passRight = await compare(UpdateUserDto.old_password, userExist.password);
      if (!passRight) {
        throw new HttpException("Password is wrong!", HttpStatus.UNAUTHORIZED)
      }
      const hashNewPass = await hash(UpdateUserDto.new_password, 10)
      await this.userModel.findOneAndUpdate({ email: this.req.user.email }, { $set: { password: hashNewPass } }, { new: true })
      return 'Your password has been successfully changed'
    }
  }

  // hotel and tour add whishlist
  async addWhishList(CreateWhishListDto: createWhishListDto): Promise<Whishlist> {
    const { hotelId, tourId } = CreateWhishListDto
    return await this.whishListModel.create({ userEmail: this.req.user.email, hotelId, tourId })
  }

  // get all whishlist
  async getAllWhishList(): Promise<Whishlist[]> {
    return await this.whishListModel.find({ userEmail: this.req.user.email }).populate([
      { path: 'hotelId' }, { path: 'tourId' }
    ])
  }



}








