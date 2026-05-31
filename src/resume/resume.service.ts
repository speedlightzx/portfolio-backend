import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../database/schemas/schemas';
import { StorageService } from '@/storage/storage.service';

@Injectable()
export class ResumeService {

    constructor(
        private readonly storage:StorageService
    ) {}

    async updateResume(file:File) {
        if(file.type !== 'application/pdf') throw new BadRequestException('Por favor, envie apenas arquivos pdf.')
        
        try {
            await this.storage.uploadResume(file) 
        } catch(e) {
            throw new InternalServerErrorException('Erro ao salvar currículo.')
        }
    }
}
