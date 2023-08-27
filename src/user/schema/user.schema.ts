import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ versionKey: false, timestamps: true })

export class User {
  @Prop({ required: true })
  first_name: string;
  @Prop({ required: true })
  last_name: string;
  @Prop({ unique: true, required: true })
  email: string;
  @Prop({ required: true })
  phone_number: string;
  @Prop({ required: true })
  password: string
  @Prop({ required: true })
  repeat_password: string
}

export const userModel = SchemaFactory.createForClass(User)

