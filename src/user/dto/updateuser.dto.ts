import { IsEmail, IsMobilePhone, IsNotEmpty, IsPhoneNumber, IsString, Length, Matches, Max, max, min } from "class-validator";

export class updateUserDto {
  @IsNotEmpty()
  @Matches(new RegExp("^[A-Za-z]{3,12}$"))
  first_name: string;

  @IsNotEmpty()
  @Matches(new RegExp("^[A-Za-z]{3,12}$"))
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('AZ', { message: "The country code is wrong" })
  @IsMobilePhone('az-AZ')
  phone_number: string;

  @IsNotEmpty()
  @Length(8, 16)
  old_password: string;

  @IsNotEmpty()
  @Length(8, 16)
  new_password: string;

}
