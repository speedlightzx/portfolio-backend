import { Body, Controller, Delete, Get, Headers, HttpCode, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Query, RawBody, UseGuards } from '@nestjs/common';
import { createOrderDTO } from './dto/createOrder.dto';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@/auth/auth.guard';
import { updateOrderDTO } from './dto/updateOrder.dto';

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

    @Patch(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard)
    async updateOrder(
        @Body() body: updateOrderDTO,
        @Param('id', ParseIntPipe) id: number
    ) {
        return await this.ordersService.updateOrder(body, id)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard)
    async deleteOrder(
        @Param('id', ParseIntPipe) id: number
    ) {
        return await this.ordersService.deleteOrder(id)
    }

    @Get(':uuid/pay')
    @HttpCode(HttpStatus.OK)
    async paidOrder(
        @Param('uuid', ParseUUIDPipe) uuid: string
    ) {
        return await this.ordersService.paidOrder(uuid)
    }

    @Post('confirmPayment')
    @HttpCode(HttpStatus.OK)
    async confirmPayment(
        @RawBody() rawBody: Buffer,
        @Headers('stripe-signature') signature: string
    ) {
        await this.ordersService.confirmPayment(rawBody, signature)
    }
}
