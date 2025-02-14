import { ApiProperty } from "@nestjs/swagger"

export class UpdateProjectDto {
    @ApiProperty()
    projectName : string
    @ApiProperty()
    projectKey : string
}