import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schemas/schemas';

@Injectable()
export class SkillsService {

  constructor(
    @Inject('db')
    private readonly db: NodePgDatabase<typeof schema>
  ) {}

  async getSkills() {
    const skillsResult = this.db.query.skills.findMany()
    const mainSkillsResult = this.db.query.mainSkills.findMany()
    
    const [skills, mainSkills] = await Promise.all([
      skillsResult,
      mainSkillsResult
    ])

    return { skills, mainSkills }
  }
}
