import { IsDecimal, IsEnum, IsOptional, IsString, Length, MaxLength } from "class-validator";
import { orderPaidEnum } from "../types/orderPaid.enum";

export class updateOrderDTO {
    
    @IsString()
    @Length(1, 100)
    @IsOptional()
    client_name

    @IsString()
    @Length(1, 100)
    @IsOptional()
    name

    @IsString()
    @MaxLength(255)
    @IsOptional()
    description

    @IsDecimal({ decimal_digits: '2' })
    @IsOptional()
    price

    @IsEnum(orderPaidEnum)
    paid
}

/*

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').unique().notNull(),
  client_name: varchar('client_name', { length: 100 }).notNull(),
  description: varchar('description', { length: 255 }),
  price: numeric('price', {
    precision: 10,
    scale: 2
  }).notNull(),
  type: orderType('type').notNull(),
  paid: orderPaid('paid').default('Unpaid'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

*/