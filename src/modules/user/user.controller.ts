import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorators';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { User } from '@prisma/client';

@Controller({ path: 'user' })
@UseGuards(JwtGuard)
export class UserController {
  @Get('me')
  @HttpCode(HttpStatus.FOUND)
  get(@GetUser() user: User){
    return user;
  }
}
