import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { BasicSignInfo } from './basic-sign-info';

export class SignUpDto extends BasicSignInfo{
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  lastName: string;
}