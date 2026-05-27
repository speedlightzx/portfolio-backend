import { BadRequestException, ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schemas/schemas';
import { createSkillDTO } from './dto/createSkill.dto';
import { eq, ilike } from 'drizzle-orm';
import { updateSkillDTO } from './dto/updateSkill.dto';

@Injectable()
export class SkillsService {

  constructor(
    @Inject('db')
    private readonly db: NodePgDatabase<typeof schema>
  ) {}

  async getSkills() {
    const skillsResult = this.db
    .select()
    .from(schema.skills)

    const mainSkillsResult = this.db
    .select({
      whatSolves: schema.mainSkills.whatSolves,
      name: schema.skills.name,
    })
    .from(schema.skills)
    .innerJoin(schema.mainSkills, eq(schema.skills.id, schema.mainSkills.skillId))
    
    const [skills, mainSkills] = await Promise.all([
      skillsResult,
      mainSkillsResult
    ])

    return { skills, mainSkills }
  }

  async createSkill(dto: createSkillDTO) {
    if(dto.hexColor.startsWith('#')) throw new BadRequestException('Por favor, remova o "#" do hex color.')
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

        return skill
      })
    } catch(e) {
      throw new InternalServerErrorException('Algum erro aconteceu ao salvar a skill no banco de dados.')
    }
  }

  async deleteSkill(id:number) {
    const deletedSkill = await this.db
    .delete(schema.skills)
    .where(eq(schema.skills.id, id))
    .returning()

    if(deletedSkill.length == 0) throw new NotFoundException(`Skill com id ${id} não encontrada.`)
  }

  async updateSkill(id:number, dto:updateSkillDTO) {
    if(dto.hexColor && dto.hexColor.startsWith('#')) throw new BadRequestException('Por favor, remova o "#" do hex color.')
    if(dto.isMainSkill && !dto.whatSolves) throw new BadRequestException('Você precisa especificar o que essa skill técnica resolve.')
    if(dto.whatSolves && !dto.isMainSkill) throw new BadRequestException('Apenas skills principais podem ter o texto de que problema resolve.')

    const [foundSkill] = await this.db
    .select()
    .from(schema.skills)
    .where(eq(schema.skills.id, id))
    .leftJoin(schema.mainSkills, eq(schema.skills.id, schema.mainSkills.skillId))

    if(!foundSkill) throw new NotFoundException(`Skill com id ${id} não encontrada.`)
    console.log(foundSkill)
  }
}
