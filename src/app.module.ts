import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SkillsModule } from './skills/skills.module';
import 'dotenv/config'

@Module({
  imports: [DatabaseModule, SkillsModule],
})
export class AppModule {}