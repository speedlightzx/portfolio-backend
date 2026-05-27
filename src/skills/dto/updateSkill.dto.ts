import { IsBoolean, IsHexColor, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from "class-validator";

export class updateSkillDTO {

    @IsOptional()
    @Length(1, 30)
    @IsString()
    name!: string

    @IsOptional()
    @Length(1, 100)
    @IsUrl()
    imageUrl!:string

    @IsOptional()
    @IsHexColor()
    hexColor!:string

    @IsOptional()
    @IsBoolean()
    isMainSkill!:boolean

    @IsOptional()
    @Length(1, 100)
    @IsString()
    whatSolves!:string
}