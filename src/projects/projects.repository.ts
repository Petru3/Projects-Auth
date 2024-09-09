import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Project } from './project.entity';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectStatus } from './project-status.enum';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ProjectsRepository extends Repository<Project> 
{
  constructor(private readonly dataSource: DataSource) {
    super(Project, dataSource.createEntityManager());
  }
  private logger = new Logger('TaskRepository')


  async getAllProjects(
    filterDto: GetProjectsFilterDto, 
    user: User
  ): Promise<Project[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('project');

    query.where('project.userId = :userId', {userId: user.id});

    if (status) {
      query.andWhere('project.status = :status', { status });
    }

    if (search) {
      query.andWhere('(project.title LIKE :search OR project.description LIKE :search)', {
        search: `%${search}%`,
      });
    }

    try {
      const projects = await query.getMany(); // Await is necessary
      return projects;
    } catch (error) {
      this.logger.error(`Failed to get projects for user "${user.username}", DTO: ${JSON.stringify(filterDto)}`, error.stack)
      throw new InternalServerErrorException();
    }
  }

  async createProject(
    createProjectDto: CreateProjectDto, 
    user: User
  ): Promise<Project> {
    const { title, description } = createProjectDto;

    const newProject = new Project();
    newProject.title = title;
    newProject.description = description;
    newProject.status = ProjectStatus.OPEN;

    newProject.user = user;

    try {
      await this.save(newProject);
    } catch (error) {
      this.logger.error(`Failed to create a task for user "${user.username}", Data ${createProjectDto}`, error.stack)
      throw new InternalServerErrorException();
    }

    delete newProject.user;
    return newProject;
  }

  async updateProject(
    id: number, 
    updateProjectDto: UpdateProjectDto, 
    status: ProjectStatus, user: User  
  ): Promise<Project> {
    const currentProject = await this.findOne({ where: { id } });
  
    if (!currentProject) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
  
    const updatedProject = {
      ...currentProject,
      ...updateProjectDto,
    };

    updatedProject.status = status;
  
    try {
      return await this.save(updatedProject);
    } catch (error) {
      console.error('Error updating project:', error);  // Log the actual error
      throw new InternalServerErrorException('Failed to update the project.');  // Pass a descriptive error message
    }
  }

  async deleteProject(
    id: number, 
    user: User
  ): Promise<void> {
    const result: DeleteResult = await this.delete({ id });
  
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID "${id}" not found.`);
    }
  }
  
  
}
