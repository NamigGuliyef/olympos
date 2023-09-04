import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { whishListModel } from 'src/whishlist/whishlist.schema';
import { userModel } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: userModel }, { name: "whishlist", schema: whishListModel }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }

