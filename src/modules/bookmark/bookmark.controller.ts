import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorators';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dtos';

@Controller('bookmark')
@UseGuards(JwtGuard)
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService){}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto
  ) : Promise<CreateBookmarkDto> {
    return await this.bookmarkService.createBookmark(userId, dto);
  }

  @Delete()
  async delete() {

  }

  @Patch()
  async edit() {

  }

  @Get()
  async getById(){
    
  }

  @Get()
  async getByUser(){

  }
}
