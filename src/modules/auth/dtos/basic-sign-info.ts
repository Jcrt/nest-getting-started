import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class BasicSignInfo {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}