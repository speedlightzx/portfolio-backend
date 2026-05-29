import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schemas/schemas';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class ProjectsService {

    constructor(
        @Inject('db')
        private readonly db:NodePgDatabase<typeof schema>
    ) {

    }

    async getProjects() {
        return await this.db
        .select({
            title: schema.projects.title,
            shortDescription: schema.projects.shortDescription,
            description: schema.projects.description,
            context: schema.projects.context,
            thumbnailUrl: schema.projects.thumbnailUrl,
            showcaseImagesUrl: schema.projects.showcaseImagesUrl,
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
}
