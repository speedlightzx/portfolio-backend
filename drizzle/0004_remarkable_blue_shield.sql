ALTER TYPE "public"."order_paid" ADD VALUE 'Pending';--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "uuid" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "order_name" varchar(100) NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "orderUuid_idx" ON "orders" USING btree ("uuid");