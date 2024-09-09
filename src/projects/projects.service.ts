import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsRepository } from './projects.repository';
import { Project } from './project.entity';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { DeleteResult } from 'typeorm';
import { ProjectStatus } from './project-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(Project)
        private readonly projectsRepository: ProjectsRepository,
        private readonly projectRepo: ProjectsRepository
    ) {}

    async getAllProjects(
        filterDto: GetProjectsFilterDto,
        user: User
    ):Promise<Project[]> {
        return this.projectRepo.getAllProjects(filterDto, user);
    }

    async getProjectById(
        id: number, 
        user: User    
    ): Promise<Project> {
        const result = await this.projectRepo.findOne({where: {id: id}});

        if(!result) {
            throw new NotFoundException(`The project with id: "${id}" not found.`);
        }

        return result;
    }

    async createProject(
        createProjectDto: CreateProjectDto, 
        user: User    
    ): Promise<Project> {
        return this.projectRepo.createProject(createProjectDto, user);
    }

    async updateProject(
        id: number,
        updateProjectDto: UpdateProjectDto,
        status: ProjectStatus,
        user: User
    ): Promise<Project> {
        return this.projectRepo.updateProject(id, updateProjectDto, status, user)
    }

    async deleteProject(
        id: number,
        user: User
    ): Promise<void> {
        return this.projectRepo.deleteProject(id, user);
    }
}
