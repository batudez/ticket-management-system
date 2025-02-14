import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateProjectDto {
    @IsNotEmpty()
    @ApiProperty()
    projectName : string
    @IsNotEmpty()
    @ApiProperty()
    projectKey : string
    @ApiProperty()
    @IsNotEmpty()
    maxTicketValue : number
}