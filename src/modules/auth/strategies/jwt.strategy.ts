import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') 
{
  constructor(
    protected configService: ConfigService, 
    private prismaService: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      secretOrKey: configService.getOrThrow('JWT_SECRET')
    });
  }

  validate = async (payload: { sub: number, email: string }) => {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: payload.sub, 
        email: payload.email,
        active: true
      }, select: {
        id: true, 
        email: true,
        createdAt: true, 
        firstName: true, 
        lastName: true
      }
    })

    return user;
  }
}