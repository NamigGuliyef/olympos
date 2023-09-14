import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Review {
  @Prop({ ref: 'user' })
  userEmail: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'hotel' })
  hotelId: Types.ObjectId;
  @Prop({ required: true })
  description: string;
}

export const reviewModel = SchemaFactory.createForClass(Review);

