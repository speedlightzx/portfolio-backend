import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from "class-validator";

export class createSkillDTO {

    @IsNotEmpty()
    @Length(1, 30)
    @IsString()
    name!: string

    @IsNotEmpty()
    @Length(1, 100)
    @IsUrl()
    imageUrl!:string

    @IsNotEmpty()
    @Length(1, 20)
    @IsString()
    hexColor!:string

    @IsOptional()
    @IsBoolean()
    isMainSkill!:boolean

    @IsOptional()
    @Length(1, 100)
    @IsString()
    whatSolves!:string
}