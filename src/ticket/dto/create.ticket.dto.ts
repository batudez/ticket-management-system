import { ApiProperty } from "@nestjs/swagger";
import { IssueType, Priority, TicketStatus } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class CreateTicketDto {
    @IsNotEmpty()
    @ApiProperty()
    summary : string
    @IsNotEmpty()
    @ApiProperty()
    description : string
    @IsNotEmpty()
    @ApiProperty()
    issueType : IssueType
    @IsNotEmpty()
    @ApiProperty()
    ticketStatus : TicketStatus
    @IsNotEmpty()
    @ApiProperty()
    priority : Priority
    @IsNotEmpty()
    @ApiProperty()
    issueCreatedBy : string
    @IsNotEmpty()
    @ApiProperty()
    clientId : string
    @IsNotEmpty()
    @ApiProperty()
    categoryId : number
    @IsNotEmpty()
    @ApiProperty()
    projectKey : string
}