import { ApiProperty } from "@nestjs/swagger";
import { TicketStatus } from "@prisma/client";
import { IsEnum } from "class-validator";

export class UpdateTicketStatusDto {
    @IsEnum(TicketStatus)
    @ApiProperty()
    ticketStatus : TicketStatus;
}