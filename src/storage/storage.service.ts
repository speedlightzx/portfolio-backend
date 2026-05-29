import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class StorageService {
    private readonly supabase:SupabaseClient

    constructor() {
        this.supabase = createClient(
            process.env.DATABASE_URL!,
            process.env.SUPABASE_KEY!
        )
    }

    async uploadResume(file: Express.Multer.File): Promise<string | null> {
        const fileName = file.originalname

        const { error } = await this.supabase.storage
        .from('curriculo')
        .upload(fileName, file.buffer, {
            contentType: file.mimetype,
            upsert: true
        })
        
        if(error) return error.message

        return null
    }
}
