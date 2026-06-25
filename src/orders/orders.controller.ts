import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { createOrderDTO } from './dto/createOrder.dto';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@/auth/auth.guard';

@Controller('orders')
export class OrdersController {

    constructor(
        private readonly ordersService:OrdersService
    ) {}

    @Get()
    @UseGuards(AuthGuard)
    async getOrders() {
        return await this.ordersService.getOrders()
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    async createOrder(
        @Body() body: createOrderDTO
    ) {
        return await this.ordersService.createOrder(body)
    }
}
