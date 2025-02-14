import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { jwtSecret } from '../utils/constants';
import { AuthSignInDto, AuthSignUpDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async signup(dto: AuthSignUpDto) {
        const { clientName, clientSecret } = dto

        const foundClient = await this.prisma.client.findUnique({ where: { clientName } })

        if (foundClient) {
            throw new BadRequestException('Client name already exists');
        }

        const hashedSecret = await this.hashClientSecret(clientSecret)
        await this.prisma.client.create({
            data: {
                clientName,
                hashedSecret
            }
        })

        return { message: 'signup was successfull !' }
    }

    async signin(dto: AuthSignInDto, req: Request, res: Response) {
        const { clientId, clientSecret } = dto;

        const foundClient = await this.prisma.client.findUnique({ where: { clientId } });
        if (!foundClient) {
            throw new BadRequestException('Wrong credentials')
        }
        const isMatch = await this.compareSecrets({ clientSecret, hash: foundClient.hashedSecret })
        if (!isMatch) {
            throw new BadRequestException('Wrong credentials')
        }

        const token = await this.signToken({
            clientId: foundClient.clientId,
            clientName: foundClient.clientName
        });
        if (!token) throw new ForbiddenException()

        res.cookie('token', token)

        return res.send({ message: "Logged in Successfully" });
    }

    async signout(req: Request, res: Response) {
        res.clearCookie('token')
        return res.send({ message: 'Logged out Successfully !' })
    }

    async hashClientSecret(clientSecret: string) {
        const saltOrRounds = 10;
        return await bcrypt.hash(clientSecret, saltOrRounds)

    }

    async compareSecrets(args: { clientSecret: string, hash: string }) {
        return await bcrypt.compare(args.clientSecret, args.hash);
    }
    async signToken(args: { clientId: string, clientName: string }) {
        const payload = args;

        return this.jwtService.signAsync(payload, {
            secret: jwtSecret,
            expiresIn: '2m'
        });
    }
}
