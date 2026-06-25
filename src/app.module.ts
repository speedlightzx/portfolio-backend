import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SkillsModule } from './skills/skills.module';
import { ResumeModule } from './resume/resume.module';
import { StorageModule } from './storage/storage.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import 'dotenv/config'
import { ConfigModule } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    DatabaseModule, 
    SkillsModule, 
    ResumeModule, 
    StorageModule, 
    ProjectsModule, 
    AuthModule, 
    ConfigModule.forRoot({
      isGlobal: true
  }), OrdersModule
  ],
})
export class AppModule {}