import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { createProjectDTO } from './dto/createProject.dto';

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

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createProject(
        @Body() body: createProjectDTO
    ) {
        return await this.projectsService.createProject(body)
    }
}
