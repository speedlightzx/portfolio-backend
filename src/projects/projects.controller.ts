import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { createProjectDTO } from './dto/createProject.dto';
import { updateProjectDTO } from './dto/updateProject.dto';

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

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateProject(
        @Body() body: updateProjectDTO,
        @Param('id', ParseIntPipe) id: number
    ) {
        return await this.projectsService.updateProject(body, id)
    }
}
