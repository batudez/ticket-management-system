import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateTicketCategoryDto {
    @IsNotEmpty()
    @ApiProperty()
    categoryName?: string;
  }