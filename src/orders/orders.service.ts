import { BadRequestException, ConflictException, ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from "@schemas"
import { createOrderDTO } from './dto/createOrder.dto';
import { updateOrderDTO } from './dto/updateOrder.dto';
import { eq } from 'drizzle-orm';
import { orderPaidEnum } from './types/orderPaid.enum';
import { StripeService } from '@/stripe/stripe.service';
import { Event } from 'stripe';

@Injectable()
export class OrdersService {

    constructor(
        @Inject('db')
        private readonly db:NodePgDatabase<typeof schema>,

        private readonly stripeService:StripeService
    ) {}

    async createOrder(dto:createOrderDTO) {
        await this.db
        .insert(schema.orders)
        .values({
            client_name: dto.client_name,
            price: dto.price,
            type: dto.type,
            name: dto.name,
            description: dto.description,
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
            price: dto.price,
            name: dto.name
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

    async paidOrder(orderUuid:string) {
        const findOrder = await this.db.query.orders.findFirst({ 
            where: eq(schema.orders.uuid, orderUuid)
         })

        if(!findOrder) throw new NotFoundException('Não foi encontrado nenhum pedido com esse UUID.')
        if(findOrder.paid == orderPaidEnum.Paid) throw new ConflictException('Esse pedido já foi pago.')

        const checkout = await this.stripeService.createCheckout(findOrder.name, Math.round(findOrder.price * 100), orderUuid)
        return { paymentUrl: checkout.url }
    }

    async confirmPayment(body:any, signature:string) {
        let event: Event

        try {
            event = this.stripeService.verifyWebhook(body, signature)
        } catch(e) {
            throw new BadRequestException('Webhook ilegítimo.')
        }

        if(event.type != 'checkout.session.completed') return
        const uuid = event.data.object.metadata!.orderUuid

        await this.db
        .update(schema.orders)
        .set({
            paid: orderPaidEnum.Paid
        })
        .where(eq(schema.orders.uuid, uuid))
    }
}
