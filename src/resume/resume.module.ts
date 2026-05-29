import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { StorageModule } from '@/storage/storage.module';

@Module({
  controllers: [ResumeController],
  providers: [ResumeService],
  imports: [StorageModule]
})
export class ResumeModule {}
