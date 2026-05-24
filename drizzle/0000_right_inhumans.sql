CREATE TABLE "mainSkills" (
	"id" serial PRIMARY KEY NOT NULL,
	"skill_id" integer,
	"whatSolves" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_technologies" (
	"skill_id" integer NOT NULL,
	"project_id" integer NOT NULL,
	CONSTRAINT "project_technologies_project_id_skill_id_pk" PRIMARY KEY("project_id","skill_id")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(50) NOT NULL,
	"shortDescription" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"context" varchar(20) NOT NULL,
	"thumbnailUrl" text NOT NULL,
	"showcaseImagesUrl" text[]
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"imageUrl" text NOT NULL,
	"hexColor" varchar(20) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "mainSkills" ADD CONSTRAINT "mainSkills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_technologies" ADD CONSTRAINT "project_technologies_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_technologies" ADD CONSTRAINT "project_technologies_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;