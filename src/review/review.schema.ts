import mongoose, { Schema,model } from 'mongoose';


export const Review = new Schema({
  userEmail: { type: String, ref: "user" },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'hotel' },
  description: { type: String, required: true }
})

Review.pre('findOneAndDelete', async function (next) {
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

export const reviewModel = model('review', Review)
