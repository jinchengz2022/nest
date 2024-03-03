import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'userName is empty' })
  userName: string;
  @IsNotEmpty({ message: 'password is empty' })
  @MinLength(6, { message: 'password length is must six' })
  password: string;
  @IsNotEmpty({ message: 'nickName is empty' })
  nickName: string;
  @IsNotEmpty({ message: 'email is empty' })
  @IsEmail({}, { message: 'email is error' })
  email: string;
  @IsNotEmpty({ message: 'captcha is empty' })
  captcha: string;
}
