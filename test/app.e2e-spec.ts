import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { e2eConstants } from './e2e.constants';
import { RunAuthE2ETests } from './e2e/auth.e2e';
import { RunUserE2ETests } from './e2e/user.e2e';

describe('App e2e', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }));

    await app.init();
    app.listen(e2eConstants.app.port);

    prismaService = app.get(PrismaService);
    prismaService.cleanDb();
    
    pactum.request.setBaseUrl(e2eConstants.app.baseUrl);
  });
  
  afterAll(() => {
    app.close();
  })
  
  RunAuthE2ETests(app);
  RunUserE2ETests(app);

  describe('UserProject', () => {

  });

  it.todo('shouldPass');
})