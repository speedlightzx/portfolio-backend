import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schemas/schemas';
import { eq, inArray, sql } from 'drizzle-orm';
import { createProjectDTO } from './dto/createProject.dto';
import { updateProjectDTO } from './dto/updateProject.dto';

@Injectable()
export class ProjectsService {

    constructor(
        @Inject('db')
        private readonly db:NodePgDatabase<typeof schema>
    ) {}

    async getProjects() {
        return await this.db
        .select({
            id: schema.projects.id,
            title: schema.projects.title,
            shortDescription: schema.projects.shortDescription,
            description: schema.projects.description,
            context: schema.projects.context,
            thumbnailUrl: schema.projects.thumbnailUrl,
            showcaseImagesUrl: schema.projects.showcaseImagesUrl,
            githubRepositoryUrl: schema.projects.githubRepositoryUrl,
            productionUrl: schema.projects.productionUrl,
            technologies: sql<{ name: string, hexColor: string }[]>`
                json_agg(
                    json_build_object(
                        'name', ${schema.skills.name},
                        'hexColor', ${schema.skills.hexColor}
                    )
                )
            `
        })
        .from(schema.projectTechnologies)
        .innerJoin(schema.skills, eq(schema.skills.id, schema.projectTechnologies.skillId))
        .innerJoin(schema.projects, eq(schema.projects.id, schema.projectTechnologies.projectId))
        .groupBy(schema.projects.id)

    }

    async createProject(dto: createProjectDTO) {
        await this.db.transaction(async (tx) => {

            const findSkills = await tx
            .select({
                id: schema.skills.id,
                name: schema.skills.name
            })
            .from(schema.skills)
            .where(inArray(schema.skills.id, dto.technologiesId))

            if(findSkills.length == 0) throw new BadRequestException('Por favor, insira pelo menos um ID válido.')

            const [savedProject] = await tx
            .insert(schema.projects)
            .values({
                title: dto.title,
                description: dto.description,
                shortDescription: dto.shortDescription,
                context: dto.context,
                thumbnailUrl: dto.thumbnailUrl,
                githubRepositoryUrl: dto.githubRepositoryUrl,
                productionUrl: dto.productionUrl,
                showcaseImagesUrl: dto.showcaseImagesUrl
            })
            .returning()

            await tx
            .insert(schema.projectTechnologies)
            .values(findSkills.map((skill) => ({
                projectId: savedProject.id,
                skillId: skill.id
            })))
            .onConflictDoNothing()
        })
    }

    async updateProject(dto: updateProjectDTO, projectId:number) {

        const [findProject] = await this.db
        .select()
        .from(schema.projects)
        .where(eq(schema.projects.id, projectId))

        if(!findProject) throw new NotFoundException('Não foi encontrado nenhum projeto com esse ID.')

        await this.db.transaction(async (tx) => {

            if(dto.technologiesId && dto.technologiesId.length > 0) {
                const findSkills = await tx
                .select({
                    id: schema.skills.id,
                    name: schema.skills.name
                })
                .from(schema.skills)
                .where(inArray(schema.skills.id, dto.technologiesId))

                if(findSkills.length == 0) throw new BadRequestException('Por favor, insira pelo menos um ID válido.')   
            
                await tx
                .delete(schema.projectTechnologies)
                .where(eq(schema.projectTechnologies.projectId, projectId))

                await tx
                .insert(schema.projectTechnologies)
                .values(findSkills.map((skill) => ({
                    projectId: projectId,
                    skillId: skill.id
                })))
                .onConflictDoNothing()
            }

            if(dto.title || 
                dto.description || 
                dto.context || 
                dto.githubRepositoryUrl || 
                dto.productionUrl ||
                dto.shortDescription ||
                dto.showcaseImagesUrl || 
                dto.thumbnailUrl
            ) {
                await tx
                .update(schema.projects)
                .set({
                    title: dto.title,
                    description: dto.description,
                    shortDescription: dto.shortDescription,
                    context: dto.context,
                    thumbnailUrl: dto.thumbnailUrl,
                    githubRepositoryUrl: dto.githubRepositoryUrl,
                    productionUrl: dto.productionUrl,
                    showcaseImagesUrl: dto.showcaseImagesUrl
                })
                .where(eq(schema.projects.id, projectId))       
            }

        })
    }
}
