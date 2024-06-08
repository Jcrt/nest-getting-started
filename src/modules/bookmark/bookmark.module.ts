import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dtos';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [BookmarkController],
  providers: [BookmarkService]
})
export class BookmarkModule {

}
