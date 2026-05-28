import { Global, Module } from '@nestjs/common';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schemas/schemas'

const DatabaseProvider = {
  provide: 'db',
  useFactory: () => {
    const client = new Pool({
      connectionString: process.env.CONNECTION_STRING_DB_URL!
    })
    return drizzle(client, { schema })
  }
}

@Global()
@Module({
  providers: [DatabaseProvider],
  exports: [DatabaseProvider]
})
export class DatabaseModule {}
