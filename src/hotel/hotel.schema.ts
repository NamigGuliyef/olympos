import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Hotel {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  location: string;
  @Prop({ required: true })
  destination_country: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true, ref: 'review' })
  reviews: [mongoose.Schema.Types.ObjectId];
  @Prop({ required: true })
  description: string;
  @Prop()
  photos: string[];
  @Prop({ required: true })
  map: string;
  @Prop({ required: true })
  breakfast: boolean;
  @Prop({ required: true })
  parking: boolean;
  @Prop({ required: true })
  pool: boolean;
  @Prop({ required: true })
  wifi: boolean;
  @Prop({ required: true })
  air_conditioning: boolean;
  @Prop({ required: true })
  entertainment: boolean;
}

export const hotelModel = SchemaFactory.createForClass(Hotel);
