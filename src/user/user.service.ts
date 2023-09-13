import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { Model } from 'mongoose';
import { Hotel } from 'src/hotel/hotel.schema';
import { tokenRequestType } from 'src/middleware/tokenRequestType';
import { createReviewDto, updateReviewDto } from 'src/review/review.dto';
import { Review } from 'src/review/review.schema';
import { createWhishListDto } from 'src/whishlist/createWhishList.dto';
import { Whishlist } from 'src/whishlist/whishlist.schema';
import { updateUserDto } from './dto/updateuser.dto';
import { User } from './schema/user.schema';


@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private userModel: Model<User>,
    @InjectModel('whishlist') private whishListModel: Model<Whishlist>,
    @InjectModel('review') private reviewModel: Model<Review>,
    @InjectModel('hotel') private hotelModel: Model<Hotel>,
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

  // create Review
  async createReview(CreateReviewDto: createReviewDto) {
    const { hotelId, description } = CreateReviewDto
    const newReview = await this.reviewModel.create({ userEmail: this.req.user.email, hotelId, description })
    return this.hotelModel.findByIdAndUpdate(newReview.hotelId, { $push: { reviews: newReview._id } }, { new: true })
  }

  // update Review
  async updateReview(UpdateReviewDto: updateReviewDto) {
    const { hotelId, description } = UpdateReviewDto
    return await this.reviewModel.findOneAndUpdate({ hotelId: hotelId }, { $set: { description } }, { new: true })
  }

  // delete Review
  async deleteReview(_id:string):Promise<string>{
  const deleteReview = await this.reviewModel.findOneAndDelete({ _id:this.req.params._id })
  await this.hotelModel.findOneAndUpdate({ _id:deleteReview.hotelId },{ $pull:{reviews:deleteReview._id}})
  return 'Your review has been deleted'
}

}
