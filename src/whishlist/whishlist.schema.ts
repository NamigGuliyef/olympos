import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'

@Schema({ versionKey: false, timestamps: true })
export class Whishlist {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  userEmail: string
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'hotel' })
  hotelId: string
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'tour' })
  tourId: string
}

export const whishListModel = SchemaFactory.createForClass(Whishlist)
