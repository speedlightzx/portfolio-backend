import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from "@schemas"
import { createOrderDTO } from './dto/createOrder.dto';

@Injectable()
export class OrdersService {

    constructor(
        @Inject('db')
        private readonly db:NodePgDatabase<typeof schema>
    ) {}

    async createOrder(dto:createOrderDTO) {
        await this.db
        .insert(schema.orders)
        .values({
            client_name: dto.client_name,
            price: dto.price,
            type: dto.type,
            description: dto.description
        })
    }
}
