import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SkillsModule } from './skills/skills.module';
import { ResumeModule } from './resume/resume.module';
import { StorageModule } from './storage/storage.module';
import { ProjectsModule } from './projects/projects.module';
import 'dotenv/config'

@Module({
  imports: [DatabaseModule, SkillsModule, ResumeModule, StorageModule, ProjectsModule],
})
export class AppModule {}