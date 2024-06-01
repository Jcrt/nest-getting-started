import { IsEmail, IsNotEmpty, IsString, isNotEmpty } from 'class-validator';

export class SignUpDto{
  @IsEmail()
  @IsNotEmpty()
  email: String;

  @IsNotEmpty()
  @IsString()
  password: String;
}