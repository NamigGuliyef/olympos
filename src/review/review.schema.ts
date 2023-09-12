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

const reviewSchema = SchemaFactory.createForClass(Review);

reviewSchema.pre('findOneAndDelete', async function (next) {
  const _id = this.getFilter()._id;
  const deleteReview = await mongoose.model('review').findOne({ _id });
  await mongoose
    .model('hotel')
    .findOneAndUpdate(
      { _id: deleteReview.hotelId },
      { $pull: { reviews: deleteReview._id } },
    );
  next();
});

export const reviewModel = mongoose.model('review', reviewSchema);
