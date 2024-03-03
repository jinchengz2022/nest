import { IsNotEmpty } from 'class-validator';

export class AdminLoginDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  userName: string;

  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
