import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from 'src/user/schema/user.schema';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: "user", schema: userModel }])],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule { }
