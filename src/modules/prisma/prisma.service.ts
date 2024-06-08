import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  /**
   *
   */
  constructor(protected configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.getOrThrow('DATABASE_URL')
        }
      }
    });
  }

  cleanDb = () => {
    return this.$transaction([
      this.user.deleteMany(),
      this.bookmark.deleteMany()
    ]);
  }
}

