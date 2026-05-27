import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { createSkillDTO } from './dto/createSkill.dto';

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
}
