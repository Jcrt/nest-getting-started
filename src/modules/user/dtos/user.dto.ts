import {  } from '@nestjs/common'

export class UserDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  
  firstName: string;
  lastName: string;
  email: string;
  hash: string;

  active: boolean;
}