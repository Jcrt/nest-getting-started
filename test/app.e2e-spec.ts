import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import * as pactum from 'pactum';
import { BasicSignInfo, SignUpDto } from 'src/modules/auth/dtos';

describe('App e2e', () => {
  //user that should be used in tests
  const minSignInfo = {
    email: 'julio.trindade@dev.io',
    password: '123123',
  } as BasicSignInfo;

  const signUpEndpoint = '/auth/signup';
  const signInEndpoint = '/auth/signin';

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
    app.listen(3333);

    prismaService = app.get(PrismaService);
    prismaService.cleanDb();
    
    pactum.request.setBaseUrl('http://localhost:3333');
  });
  
  afterAll(() => {
    app.close();
  })
  
  describe('Auth', () => {

    describe('signUp', () => {
      it('should throw an exception if no body was sent', () => {
        return pactum.spec()
          .post(signUpEndpoint)
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should throw an exception if email empty', () => {
        return pactum.spec()
          .post(signUpEndpoint)
          .withBody({
            password: minSignInfo.password
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should throw an exception if password empty', () => {
        return pactum.spec()
          .post(signUpEndpoint)
          .withBody({
            email: minSignInfo.email
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should sign up', () => {
        const signUpDto = {
          ...minSignInfo,
          firstName: 'Julio', 
          lastName: 'Trindade'
        } as SignUpDto;

        return pactum.spec()
          .post(signUpEndpoint)
          .withBody(signUpDto)
          .expectStatus(HttpStatus.CREATED);
      });
    });

    describe('signIn', () => {
      it('should throw an exception if no body was sent', () => {
        return pactum.spec()
          .post(signInEndpoint)
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should throw an exception if email empty', () => {
        return pactum.spec()
          .post(signInEndpoint)
          .withBody({
            password: minSignInfo.password
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should throw an exception if password empty', () => {
        return pactum.spec()
          .post(signInEndpoint)
          .withBody({
            email: minSignInfo.email
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should SignIn', () => {
        return pactum.spec()
          .post(signInEndpoint)
          .withBody(minSignInfo)
          .expectStatus(HttpStatus.OK);
      });
    });
  });

  describe('User', () => {
    const userMeEndpoint = '/user/me';

    beforeAll(async () => {
      await pactum.spec()
        .post(signInEndpoint)
        .withBody(minSignInfo)
        .expectStatus(HttpStatus.OK)
        .stores('bearerToken', 'access_token');
    });


    describe('get me', () => {
      it('should return user data', () => {
        return pactum.spec()
          .get(userMeEndpoint)
          .withBearerToken('$S{bearerToken}')
          .expectStatus(HttpStatus.FOUND)
          .inspect();
      });
      it.todo('should return 401 http status code');
    })
  });

  describe('UserProject', () => {

  });

  it.todo('shouldPass');
})