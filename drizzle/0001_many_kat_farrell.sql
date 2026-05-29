ALTER TABLE "mainSkills" DROP CONSTRAINT "mainSkills_skill_id_skills_id_fk";
--> statement-breakpoint
ALTER TABLE "project_technologies" DROP CONSTRAINT "project_technologies_project_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "showcaseImagesUrl" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "githubRepositoryUrl" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "productionUrl" text;--> statement-breakpoint
ALTER TABLE "mainSkills" ADD CONSTRAINT "mainSkills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_technologies" ADD CONSTRAINT "project_technologies_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;