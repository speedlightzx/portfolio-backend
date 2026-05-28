import { Controller, HttpCode, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('resume')
export class ResumeController {

    constructor(
        private readonly resumeService:ResumeService
    ) {}

    @Post()
    @HttpCode(204)
    @UseInterceptors(FileInterceptor('file'))
    async postResume(
        @UploadedFile() file: File
    ) {
        return await this.resumeService.postResume(file)
    }
}
