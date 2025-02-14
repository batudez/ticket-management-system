import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create.project.dto';
import { UpdateProjectDto } from './dto/update.project.dto';

@Injectable()
export class ProjectService {
    constructor(private prisma : PrismaService) {}

    async create(createProjectDto : CreateProjectDto) {
        return this.prisma.project.create({
            data : {
                projectName : createProjectDto.projectName,
                projectKey : createProjectDto.projectKey,
                maxTicketValue : createProjectDto.maxTicketValue,
                ticketValue : 0
            }
        });
    }

    async findAll() {
        return this.prisma.project.findMany();
    }
    async update(projectId : number ,updateProjectDto : UpdateProjectDto) {
         return this.prisma.project.update({
            where : { projectId },
            data : updateProjectDto,
         })
    }
    async remove(projectId : number) {
        return this.prisma.project.delete({
            where : {projectId}
        })
    }
}
