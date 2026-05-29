import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from "class-validator";

export class createProjectDTO {

    @IsString()
    @IsNotEmpty()
    @Length(1, 33)
    title!:string

    @IsString()
    @IsNotEmpty()
    @Length(1, 98)
    shortDescription!:string

    @IsString()
    @IsNotEmpty()
    @Length(1, 5000)
    description!:string

    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    context!:string

    @IsUrl()
    @IsNotEmpty()
    thumbnailUrl!:string

    @IsArray()
    @IsUrl({}, { each: true })
    @IsOptional()
    showcaseImagesUrl!:string[]

    @IsOptional()
    @IsUrl()
    githubRepositoryUrl!:string

    @IsOptional()
    @IsUrl()
    productionUrl!:string

    @IsArray()
    @IsInt({ each: true })
    technologiesId!: number[]
}