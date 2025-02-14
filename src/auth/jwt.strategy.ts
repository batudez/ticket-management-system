import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(private configService : ConfigService) {
        const jwtSecret = configService.get<string>('JWT_SECRET');

        if(!jwtSecret) {
            throw new Error('Jwt Secret is not defined');
        }

        super({
            jwtFromRequest : ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            secretOrKey : jwtSecret
        })
    }

    private static extractJWT(req : Request): string | null {
        if (req.cookies && 'token' in req.cookies) {
            return req.cookies.token;
        }
        return null;
    }
    async validate(payload : {clientId : string; clientName:string}) {
        return payload;
    }
}