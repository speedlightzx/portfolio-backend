import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SkillsModule } from './skills/skills.module';
import { ResumeModule } from './resume/resume.module';
import { StorageModule } from './storage/storage.module';
import 'dotenv/config'

@Module({
  imports: [DatabaseModule, SkillsModule, ResumeModule, StorageModule],
})
export class AppModule {}