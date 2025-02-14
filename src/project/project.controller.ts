import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateProjectDto } from './dto/create.project.dto';
import { UpdateProjectDto } from './dto/update.project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
    constructor(private projectService : ProjectService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createProjectDto : CreateProjectDto) {
        return this.projectService.create(createProjectDto);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.projectService.findAll();
    }
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id')id : number , @Body() updateProjectDto : UpdateProjectDto) {
        return this.projectService.update(id , updateProjectDto);
    }
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id')id : number) {
        return this.projectService.remove(id);
    }
}
