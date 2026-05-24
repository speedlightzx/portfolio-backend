import { Test, TestingModule } from '@nestjs/testing';
import { SkillsService } from './skills.service';

const mock = {
  query: {
    skills: { findMany: jest.fn().mockResolvedValue([]) },
    mainSkills: { findMany: jest.fn().mockResolvedValue([]) },
  },
}

describe('SkillsService', () => {
  let service: SkillsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillsService,
        {
          provide: 'db',
          useValue: mock
        }
      ],
    }).compile();

    service = module.get<SkillsService>(SkillsService);
  });

  it('should return skills and mainSkills ( both array )', async () => {
    const result = await service.getSkills()
    expect(result).toHaveProperty('skills')
    expect(result).toHaveProperty('mainSkills')
    expect(Array.isArray(result.skills)).toBe(true)
    expect(Array.isArray(result.mainSkills)).toBe(true)
  })
});
