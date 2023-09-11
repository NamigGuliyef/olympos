import { IsNotEmpty, Matches } from "class-validator";
import mongoose from "mongoose";

export class createReviewDto {

  @IsNotEmpty()
  hotelId: mongoose.Schema.Types.ObjectId
  @IsNotEmpty()
  description: string

}


export class updateReviewDto {

  @IsNotEmpty()
  hotelId: mongoose.Schema.Types.ObjectId
  @IsNotEmpty()
  description: string

}