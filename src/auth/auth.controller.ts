import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDto, AuthSignUpDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Post('signup')
    signup(@Body() dto : AuthSignUpDto) {
        return this.authService.signup(dto)
    }
    @Post('signin')
    signin(@Body() dto : AuthSignInDto, @Req() req , @Res() res) {
        return this.authService.signin(dto, req , res);
    }
    @Get('signout')
    signout(@Req() req , @Res() res) {
        return this.authService.signout(req,res);
    }
}
