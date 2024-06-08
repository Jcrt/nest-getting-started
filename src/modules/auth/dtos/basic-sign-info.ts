import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class BasicSignDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}