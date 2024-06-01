import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from './dtos/index';

@Injectable({})
export class AuthService{

  /**
   *
   */
  constructor(private prismaService: PrismaService) {    
  }

  signUp(signUpDto: SignUpDto) {
    return { msg: "I have signed up", data: signUpDto };
  }

  signIn() {
    return { msg: "I have signed in" };
  }
}