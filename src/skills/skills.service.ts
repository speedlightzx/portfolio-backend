import { BadRequestException, ConflictException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schemas/schemas';
import { createSkillDTO } from './dto/createSkill.dto';
import { ilike } from 'drizzle-orm';

@Injectable()
export class SkillsService {

  constructor(
    @Inject('db')
    private readonly db: NodePgDatabase<typeof schema>
  ) {}

  async getSkills() {
    const skillsResult = this.db.query.skills.findMany()
    const mainSkillsResult = this.db.query.mainSkills.findMany()
    
    const [skills, mainSkills] = await Promise.all([
      skillsResult,
      mainSkillsResult
    ])

    return { skills, mainSkills }
  }

  async createSkill(dto: createSkillDTO) {
    if(!dto.imageUrl.startsWith('https://')) throw new BadRequestException('Insira um link válido para poder usar de imagem.')
    if(dto.hexColor.startsWith('#')) throw new BadRequestException('Por favor remova o "#" do hexColor, não é necessário.')
    if(dto.isMainSkill && !dto.whatSolves) throw new BadRequestException('Você precisa especificar o que essa skill técnica resolve.')
    if(dto.whatSolves && !dto.isMainSkill) throw new BadRequestException('Apenas skills principais podem ter o texto de que problema resolve.')
  
    const skillAlreadyExists = await this.db.query.skills.findFirst({
      where: ilike(schema.skills.name, dto.name)
    })

    if(skillAlreadyExists) throw new ConflictException('Já existe uma skill com esse nome.')
    
    try {
      return await this.db.transaction(async (tx) => {
        const [skill] = await tx
        .insert(schema.skills)
        .values({
          name: dto.name,
          hexColor: dto.hexColor,
          imageUrl: dto.imageUrl
        })
        .returning()

        if(dto.isMainSkill) {
          await tx
          .insert(schema.mainSkills)
          .values({
            skillId: skill.id,
            whatSolves: dto.whatSolves
          })
        }

        return dto
      })
    } catch(e) {
      throw new InternalServerErrorException('Algum erro aconteceu ao salvar a skill no banco de dados.')
    }
  }
}
