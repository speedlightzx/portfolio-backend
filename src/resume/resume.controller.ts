import { Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@/auth/auth.guard';

@Controller('resume')
export class ResumeController {

    constructor(
        private readonly resumeService:ResumeService
    ) {}

    @Post()
    @HttpCode(204)
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    async postResume(
        @UploadedFile() file: Express.Multer.File
    ) {
        return await this.resumeService.updateResume(file)
    }
}
