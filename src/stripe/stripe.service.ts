import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {

    private stripe: Stripe

    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_KEY!)
    }

    async createCheckout(
        orderName:string,
        orderPrice:number,
        orderUuid:string
    ) {
       return await this.stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [{
                quantity: 1,
                price_data: {
                    currency: 'brl',
                    product_data: {
                        name: orderName,
                    },
                    unit_amount: orderPrice
                }
            }],
            success_url: 'http://localhost:3000/', //alterar pro endereço do portfolio, com query param de success=true
            metadata: {
                orderUuid: orderUuid
            }
        })
    }

    verifyWebhook(payload:any, signature:string) {
        return this.stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!)
    }
}
