import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest'
import { AppModule } from '../app.module';

describe('SkillsService', () => {
  let app: INestApplication;

  const mockSkillName = "Supertest Testing"

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = module.createNestApplication()
    await app.init()
  });

  it('should return skills and mainSkills ( both array )', async () => {
    const res = await request(app.getHttpServer())
    .get('/skills')
    .expect(200)

    expect(res.body).toHaveProperty('mainSkills')
    expect(res.body).toHaveProperty('skills')
    expect(Array.isArray(res.body.skills)).toBe(true)
    expect(Array.isArray(res.body.mainSkills)).toBe(true)
  })

  it('should create a new skill', async () => {

    await request(app.getHttpServer())
    .post('/skills')
    .send({
      name: mockSkillName,
      imageUrl: "https://imagelink.com.br/images/nestjs",
      hexColor: "#FFFFFF",
      isMainSkill: true,
      whatSolves: "testar rotas"
    })
    .expect(201)

  })

  it('verify if created skill/mainSkill from previous test', async () => {
    
    const res = await request(app.getHttpServer())
    .get('/skills')

    const body = res.body

    expect(body.skills).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: mockSkillName })
      ])
    )
    expect(body.mainSkills).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: mockSkillName })
      ])
    )

  })
});
