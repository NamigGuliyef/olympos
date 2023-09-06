import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { tokenCheckMiddleware } from './middleware/tokencheck.middleware';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { MailerModule } from '@nestjs-modules/mailer'
import { AdminModule } from './admin/admin.module';
import { AdminController } from './admin/admin.controller';
import { CloudinaryModule } from './cloudinary/cloudinary.module';


@Module({
  imports: [UserModule, AuthModule,
    MongooseModule.forRoot('mongodb+srv://node01:node01@cluster0.2drqhim.mongodb.net/?retryWrites=true&w=majority'),
    MailerModule.forRoot({
      transport: {
        port: 587,
        service: "gmail",
        auth: {
          user: "quliyevnamiq8@gmail.com",
          pass: "jjdeczqkscvbslrf"
        },
      }
    }),
    AdminModule,
    CloudinaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(tokenCheckMiddleware).forRoutes(UserController, AdminController)
  }
}
