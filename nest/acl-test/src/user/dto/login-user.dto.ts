import { Length, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @Length(1, 50)
  userName: string;

  @IsNotEmpty()
  @Length(1, 50)
  password: string;
}
