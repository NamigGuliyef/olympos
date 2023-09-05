import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Whishlist {
  @Prop({ ref: 'user' })
  userEmail: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'hotel' })
  hotelId: Types.ObjectId;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'tour' })
  tourId: Types.ObjectId;
  @Prop({ expires: 60 * 60 * 24 * 7 })
  createdAt: Date;
}

export const whishListModel = SchemaFactory.createForClass(Whishlist);
