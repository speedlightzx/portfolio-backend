import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schemas/schemas';
import { StorageService } from '@/storage/storage.service';

@Injectable()
export class ResumeService {

    constructor(
        @Inject('db')
        private readonly db:NodePgDatabase<typeof schema>,

        private readonly storage:StorageService
    ) {}

    async postResume(file:File) {
        if(file.type !== 'application/pdf') throw new BadRequestException('Por favor, envie apenas arquivos pdf.')
        
        try {
            await this.storage.uploadResume(file) 
        } catch(e) {
            throw new InternalServerErrorException('Erro ao salvar currículo.')
        }
    }
}
