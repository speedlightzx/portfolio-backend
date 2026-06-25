import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from "@schemas"
import { createOrderDTO } from './dto/createOrder.dto';
import { updateOrderDTO } from './dto/updateOrder.dto';
import { eq } from 'drizzle-orm';

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

    async getOrders() {
        return this.db
        .select()
        .from(schema.orders)
    }


    async updateOrder(dto:updateOrderDTO, orderId:number) {
        if(Object.keys(dto).length == 0) throw new BadRequestException('Você precisa enviar pelo menos um campo para editar!')
        const order = await this.db
        .update(schema.orders)
        .set({
            client_name: dto.client_name,
            description: dto.description,
            paid: dto.paid,
            price: dto.price
        })
        .where(eq(schema.orders.id, orderId))
        .returning()

        if(order.length == 0) throw new NotFoundException(`Não foi encontrado nenhum pedido cadastrado com o id: ${orderId}`)
    }

    async deleteOrder(orderId:number) {
        const order = await this.db
        .delete(schema.orders)
        .where(eq(schema.orders.id, orderId))

        if(order.length == 0) throw new NotFoundException(`Não foi encontrado nenhum pedido cadastrado com o id: ${orderId}`)
    }
}
