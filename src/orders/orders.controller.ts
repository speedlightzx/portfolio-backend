import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { createOrderDTO } from './dto/createOrder.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {

    constructor(
        private readonly ordersService:OrdersService
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createOrder(
        @Body() body: createOrderDTO
    ) {
        return await this.ordersService.createOrder(body)
    }
}
