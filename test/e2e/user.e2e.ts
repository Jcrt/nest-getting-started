import { HttpStatus, INestApplication } from '@nestjs/common';
import * as pactum from 'pactum';
import { e2eConstants } from '../e2e.constants';

export const RunUserE2ETests = (app: INestApplication) => {

  describe('User module tests', () => {
    beforeAll(async () => {
      await pactum.spec()
        .post(e2eConstants.routes.auth.signIn)
        .withBody(e2eConstants.user.default)
        .expectStatus(HttpStatus.OK)
        .stores('bearerToken', 'access_token');
    });


    describe('get me', () => {
      it('should return user data', () => {
        return pactum.spec()
          .get(e2eConstants.routes.user.me)
          .withBearerToken('$S{bearerToken}')
          .expectStatus(HttpStatus.FOUND);
      });
      it.todo('should return 401 http status code');
    })
  })
}