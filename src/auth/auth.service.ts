import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { createUserDto } from 'src/user/dto/createuser.dto';
import { User, userModel } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { Verify } from 'src/verify/verify_code.schema';
import { userSignInResponse, userSignUpResponse, userTokenResponse, verifyCodeResponse } from './auth.types';


@Injectable()
export class AuthService {
  constructor(private UserService: UserService, private mailerService: MailerService, @InjectModel('verify') private readonly verifyModel: Model<Verify>) { }

  async signUp(CreateUserDto: createUserDto): Promise<userSignUpResponse> {
    try {
      const hashPass = await hash(CreateUserDto.password, 10)
      await this.UserService.createUser({ ...CreateUserDto, password: hashPass })
      return { message: "New user created" }
    } catch (error) {
      throw new Error
    }
  }


  async signIn(userSignin: userSignInResponse): Promise<userTokenResponse> {
    try {
      const user = await this.UserService.getUserByEmail(userSignin.email)
      if (!user) {
        throw new NotFoundException()
      }
      const passRight = await compare(userSignin.password, user.password)
      if (!passRight) {
        throw new UnauthorizedException()
      }
      const token = sign({ email: user.email }, "jwt_olympos_2023", { expiresIn: '10m' })
      return { token, message: "You are successfully logged in" }
    } catch (error) {
      throw new Error
    }
  }


  async forgetPass(email: string) {
    try {
      const user = await this.UserService.getUserByEmail(email)
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND)
      }
      const verify_code = Math.floor(Math.random() * 1000000)
      this.verifyModel.create({ verify_code, userEmail: user.email })
      this.mailerService.sendMail({
        from: "quliyevnamiq8@gmail.com",
        to: `${email}`,
        subject: " Verify code",
        html: `Verify code : ${verify_code}`
      })
      return 'A verification code has been sent to your email'
    } catch (error) {
      throw new Error
    }
  }


  async verifyCode(verify_code: number): Promise<userTokenResponse> {
    const check_confirmation = await this.verifyModel.findOne({ verify_code })
    if (!check_confirmation) {
      throw new HttpException('Verification code is incorrect', HttpStatus.UNAUTHORIZED)
    }
    const token = sign({ email: check_confirmation.userEmail }, 'jwt_olympos_2023', { expiresIn: "10m" })
    return { token, message: "Verification code is correct" }
  }


  async recoveryPassword(token: string) {
    if (!token) {
      throw new HttpException('Token is invalid', HttpStatus.NOT_FOUND)
    }
    verify(token, 'jwt_olympos_2023', async (err, forget: User) => {
      if (err) {
        throw new HttpException('Token is wrong', HttpStatus.UNAUTHORIZED)
      }
      const hashPass = await hash(forget.password, 10)
    

    })


  }

}

