import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateBookmarkDto } from './dtos';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(
    private userService: UserService, 
    private prismaService: PrismaService
  ){}

  createBookmark = async (userId: number, dto: CreateBookmarkDto) => {
    const user = this.userService.getById(userId);

    if(!user)
      throw new BadRequestException('user not found');

    var result = await this.prismaService.bookmark.create({
      data: {
        userId: userId, 
        description: dto.description, 
        type: dto.type, 
        data: dto.data
      }
    });

    return {
      ...result
    } as CreateBookmarkDto;
  }
}
