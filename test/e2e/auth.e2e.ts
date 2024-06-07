import { HttpStatus, INestApplication } from '@nestjs/common';
import * as pactum from 'pactum';
import { e2eConstants } from '../e2e.constants';
import { SignUpDto } from '../../src/modules/auth/dtos';

export const RunAuthE2ETests = (app: INestApplication) => {

  describe('Auth module test', () =>
  {
      describe('signUp', () => {
        it('should throw an exception if no body was sent', () => {
          return pactum.spec()
            .post(e2eConstants.routes.auth.signUp)
            .expectStatus(HttpStatus.BAD_REQUEST);
        });

        it('should throw an exception if email empty', () => {
          return pactum.spec()
            .post(e2eConstants.routes.auth.signUp)
            .withBody({
              password: e2eConstants.user.default.password
            })
            .expectStatus(HttpStatus.BAD_REQUEST);
        });

        it('should throw an exception if password empty', () => {
          return pactum.spec()
            .post(e2eConstants.routes.auth.signUp)
            .withBody({
              email: e2eConstants.user.default.email
            })
            .expectStatus(HttpStatus.BAD_REQUEST);
        });

        it('should sign up', () => {
          const signUpDto = {
            ...e2eConstants.user.default,
            firstName: 'Julio',
            lastName: 'Trindade'
          } as SignUpDto;

          return pactum.spec()
            .post(e2eConstants.routes.auth.signUp)
            .withBody(signUpDto)
            .expectStatus(HttpStatus.CREATED);
        });
      });

      describe('signIn', () => {
        it('should throw an exception if no body was sent', () => {
          return pactum.spec()
            .post(e2eConstants.routes.auth.signIn)
            .expectStatus(HttpStatus.BAD_REQUEST);
        });

        it('should throw an exception if email empty', () => {
          return pactum.spec()
            .post(e2eConstants.routes.auth.signIn)
            .withBody({
              password: e2eConstants.user.default.password
            })
            .expectStatus(HttpStatus.BAD_REQUEST);
        });

        it('should throw an exception if password empty', () => {
          return pactum.spec()
            .post(e2eConstants.routes.auth.signIn)
            .withBody({
              email: e2eConstants.user.default.email
            })
            .expectStatus(HttpStatus.BAD_REQUEST);
        });

        it('should SignIn', () => {
          return pactum.spec()
            .post(e2eConstants.routes.auth.signIn)
            .withBody(e2eConstants.user.default)
            .expectStatus(HttpStatus.OK);
        });
      });
    }
  )
}