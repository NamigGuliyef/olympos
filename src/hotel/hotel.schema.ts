import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Hotel {
  @Prop()
  name: string;
  @Prop()
  location: string;
}

export const hotelModel = SchemaFactory.createForClass(Hotel);
