import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
@Module({
  imports: [AuthModule, BookmarkModule, UserModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
