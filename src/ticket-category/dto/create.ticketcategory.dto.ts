import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTicketCategoryDto {
    @IsNotEmpty()
    @ApiProperty()
    categoryName: string;
  }