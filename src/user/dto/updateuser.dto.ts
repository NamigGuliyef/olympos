import { IsEmail, IsMobilePhone, IsNotEmpty, IsPhoneNumber, Length, Matches } from "class-validator";
import { alphabeticallyName } from "src/utils/regex";

export class updateUserDto {
  @IsNotEmpty()
  @Matches(alphabeticallyName)
  first_name: string;

  @IsNotEmpty()
  @Matches(alphabeticallyName)
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
