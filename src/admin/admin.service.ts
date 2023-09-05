import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class AdminService {
constructor( @InjectModel('user') private userModel: Model<User>){}

 // create hotel 




}
