import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('BoardController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/POST boards', async () => {
    const payload = { title: 'Test Board' };
    return request(app.getHttpServer())
      .post('/boards')
      .send(payload)
      .expect(201)
      .then((response) => {
        expect(response.body.title).toEqual(payload.title);
      });
  });

});

