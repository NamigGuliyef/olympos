import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from 'src/user/schema/user.schema';
import { UserController } from 'src/user/user.controller';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { VerifyModel } from 'src/verify/verify_code.schema';
import { whishListModel } from 'src/whishlist/whishlist.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, MongooseModule.forFeature([{ name: 'user', schema: userModel }, 
  { name: "verify", schema: VerifyModel }, { name: "whishlist", schema: whishListModel }])],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService]
})
export class AuthModule { }
