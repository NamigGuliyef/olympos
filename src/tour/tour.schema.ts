import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
@Schema({ versionKey: false, timestamps: true })

export class Tour {
  @Prop({ required: true })
  name: string
}

export const tourModel = SchemaFactory.createForClass(Tour)