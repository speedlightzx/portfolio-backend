import { Global, Module } from '@nestjs/common';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schemas/schemas'

const DatabaseProvider = {
  provide: 'db',
  useFactory: () => {
    const client = postgres(process.env.DATABASE_URL!)
    return drizzle(client, { schema })
  }
}

@Global()
@Module({
  providers: [DatabaseProvider],
  exports: [DatabaseProvider]
})
export class DatabaseModule {}
