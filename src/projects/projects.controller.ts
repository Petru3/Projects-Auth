import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatusValidationPipe } from './pipes/project-status-validation.pipe';
import { ProjectStatus } from './project-status.enum';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

import { AuthGuard } from '@nestjs/passport';


@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get()
    async getAllProjects(
        @Query(ValidationPipe) filterDto: GetProjectsFilterDto,
        @GetUser() user: User
    ): Promise<Project[]> {
        return this.projectsService.getAllProjects(filterDto, user);
    }

    @Get(':id')
    async getProjectById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<Project> {
        return this.projectsService.getProjectById(id, user);
    }

    @Post()
    async createProject(
        @Body() createProjectDto: CreateProjectDto,
        @GetUser() user: User
    ): Promise<Project> {
        return this.projectsService.createProject(createProjectDto, user)
    }

    @Patch(':id')
    async updateProjectDto(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', ProjectStatusValidationPipe) status: ProjectStatus,
        @Body() updateProjectDto: UpdateProjectDto,
        @GetUser() user: User
    ):Promise<Project> {
        return this.projectsService.updateProject(id, updateProjectDto, status, user);
    }

    @Delete(':id')
    async deleteProject(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<void> {
        return this.projectsService.deleteProject(id, user);
    }
}
