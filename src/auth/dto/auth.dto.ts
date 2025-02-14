import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class AuthSignUpDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    public clientName: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @Length(3,20 , {message : 'clientSecret has to be at between 3 to 20 chars'})
    public clientSecret : string
}

export class AuthSignInDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    public clientId : string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    @Length(3,20 , {message : 'clientSecret has to be at between 3 to 20 chars'})
    public clientSecret : string
}