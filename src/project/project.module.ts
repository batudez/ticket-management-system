import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
    providers:[ProjectService,PrismaService,JwtStrategy],
    exports:[ProjectService],
    controllers: [ProjectController],
})
export class ProjectModule {}
