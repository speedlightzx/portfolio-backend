import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(
        private readonly projectsService:ProjectsService
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getProjects() {
        return await this.projectsService.getProjects()
    }
}
