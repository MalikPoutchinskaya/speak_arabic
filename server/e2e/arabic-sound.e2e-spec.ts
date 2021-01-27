import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ArabicSound from '../src/domain/arabic-sound.entity';
import { ArabicSoundService } from '../src/service/arabic-sound.service';

describe('ArabicSound Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId'
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    delete: (): any => entityMock
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(ArabicSoundService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all arabic-sounds ', async () => {
    const getEntities: ArabicSound[] = (
      await request(app.getHttpServer())
        .get('/api/arabic-sounds')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET arabic-sounds by id', async () => {
    const getEntity: ArabicSound = (
      await request(app.getHttpServer())
        .get('/api/arabic-sounds/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create arabic-sounds', async () => {
    const createdEntity: ArabicSound = (
      await request(app.getHttpServer())
        .post('/api/arabic-sounds')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update arabic-sounds', async () => {
    const updatedEntity: ArabicSound = (
      await request(app.getHttpServer())
        .put('/api/arabic-sounds')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE arabic-sounds', async () => {
    const deletedEntity: ArabicSound = (
      await request(app.getHttpServer())
        .delete('/api/arabic-sounds/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
