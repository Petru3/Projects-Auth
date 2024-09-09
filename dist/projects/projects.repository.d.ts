import { DataSource, Repository } from 'typeorm';
import { Project } from './project.entity';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectStatus } from './project-status.enum';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from 'src/auth/user.entity';
export declare class ProjectsRepository extends Repository<Project> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    private logger;
    getAllProjects(filterDto: GetProjectsFilterDto, user: User): Promise<Project[]>;
    createProject(createProjectDto: CreateProjectDto, user: User): Promise<Project>;
    updateProject(id: number, updateProjectDto: UpdateProjectDto, status: ProjectStatus, user: User): Promise<Project>;
    deleteProject(id: number, user: User): Promise<void>;
}
