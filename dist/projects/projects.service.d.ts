import { ProjectsRepository } from './projects.repository';
import { Project } from './project.entity';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from './project-status.enum';
import { User } from 'src/auth/user.entity';
export declare class ProjectsService {
    private readonly projectsRepository;
    private readonly projectRepo;
    constructor(projectsRepository: ProjectsRepository, projectRepo: ProjectsRepository);
    getAllProjects(filterDto: GetProjectsFilterDto, user: User): Promise<Project[]>;
    getProjectById(id: number, user: User): Promise<Project>;
    createProject(createProjectDto: CreateProjectDto, user: User): Promise<Project>;
    updateProject(id: number, updateProjectDto: UpdateProjectDto, status: ProjectStatus, user: User): Promise<Project>;
    deleteProject(id: number, user: User): Promise<void>;
}
