import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from "class-validator";

export class updateProjectDTO {

    @IsString()
    @IsNotEmpty()
    @Length(1, 33)
    @IsOptional()
    title!:string

    @IsString()
    @IsNotEmpty()
    @Length(1, 98)
    @IsOptional()
    shortDescription!:string

    @IsString()
    @IsNotEmpty()
    @Length(1, 5000)
    @IsOptional()
    description!:string

    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    @IsOptional()
    context!:string

    @IsUrl()
    @IsNotEmpty()
    @IsOptional()
    thumbnailUrl!:string

    @IsArray()
    @IsUrl({}, { each: true })
    @IsOptional()
    @ArrayMinSize(1)
    showcaseImagesUrl!:string[]

    @IsOptional()
    @IsUrl()
    githubRepositoryUrl!:string

    @IsOptional()
    @IsUrl()
    productionUrl!:string

    @IsArray()
    @IsInt({ each: true })
    @IsOptional()
    @ArrayMinSize(1)
    technologiesId!: number[]
}