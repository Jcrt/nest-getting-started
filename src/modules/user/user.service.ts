import { Injectable } from '@nestjs/common';
import { UserDto } from './dtos';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private prismaService: PrismaService) { }

  getById = async (id: number): Promise<UserDto> => {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id
      }
    });

    if(!user)
      return undefined;

    return {
      ...user
    } as UserDto;
  }
}