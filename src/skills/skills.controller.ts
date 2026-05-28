import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { createSkillDTO } from './dto/createSkill.dto';
import { updateSkillDTO } from './dto/updateSkill.dto';

@Controller('skills')
export class SkillsController {

  constructor(private readonly skillsService: SkillsService) {}
  
  @Get()
  @HttpCode(HttpStatus.OK)
  async getSkills() {
    return await this.skillsService.getSkills()
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSkill(
    @Body() body: createSkillDTO 
  ) {
    return await this.skillsService.createSkill(body)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSkill(@Param('id', ParseIntPipe) id: number) {
    return await this.skillsService.deleteSkill(id)
  }

  @Put(':id')
  @HttpCode(204)
  async updateSkill(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: updateSkillDTO
  ) {
    return await this.skillsService.updateSkill(id, body)
  }
}
