import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto, SignUpDto as SignUpDto } from './dtos/index';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService{

  /**
   *
   */
  constructor(
    private prismaService: PrismaService, 
    private jwtService: JwtService, 
    private configService: ConfigService
  ) {    
  }

  async signUp(signUpDto: SignUpDto) {
    const hash = await argon.hash(signUpDto.password);

    try{
      const user = await this.prismaService.user.create({
        data: {
          firstName: signUpDto.firstName,
          lastName: signUpDto.lastName,
          email: signUpDto.email,
          hash
        }
      })

      //Or u can use this to remove properties from object
      return this.signToken(user.id, user.email);

    } catch (error){
      if (error instanceof PrismaClientKnownRequestError){
        if(error.code === 'P2002'){
          throw new ForbiddenException('Credentials taken');
        }
      }
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: signInDto.email
      }
    });

    if(!user){
      throw new ForbiddenException('Incorrect credentials');
    }

    const pwMatches = await argon.verify(user.hash, signInDto.password);

    if (!pwMatches) {
      throw new ForbiddenException('Incorrect credentials');
    }

    return this.signToken(user.id, user.email);
  }

  private async signToken(userId: number, email: string) : Promise<{
    access_token: string
  }>{
    const payload = {
      sub: userId, 
      email
    }

    const jwtSecret = this.configService.getOrThrow('JWT_SECRET');
    const jwtExpiresIn = this.configService.getOrThrow('JWT_EXPIRES_IN');

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: jwtExpiresIn,
      secret: jwtSecret
    });
    
    return Promise.resolve({
      access_token: token
    });
  }
}