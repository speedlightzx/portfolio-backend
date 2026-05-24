import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { SkillsService } from './skills.service';

@Controller('skills')
export class SkillsController {

  constructor(private readonly skillsService: SkillsService) {}
  
  @Get()
  @HttpCode(HttpStatus.OK)
  async getSkills() {
    return this.skillsService.getSkills()
  }
}
