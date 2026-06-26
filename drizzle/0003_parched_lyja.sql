CREATE TYPE "public"."order_paid" AS ENUM('Paid', 'Unpaid');--> statement-breakpoint
CREATE TYPE "public"."order_type" AS ENUM('One Time', 'Monthly');--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid(),
	"client_name" varchar(100) NOT NULL,
	"description" varchar(255),
	"price" numeric(10, 2) NOT NULL,
	"type" "order_type" NOT NULL,
	"paid" "order_paid" DEFAULT 'Unpaid',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "project_technologies" ADD COLUMN "orderPriority" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "orderPriority" integer DEFAULT 0;