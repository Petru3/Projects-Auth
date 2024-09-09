import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from './project-status.enum';
import { User } from 'src/auth/user.entity';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    getAllProjects(filterDto: GetProjectsFilterDto, user: User): Promise<Project[]>;
    getProjectById(id: number, user: User): Promise<Project>;
    createProject(createProjectDto: CreateProjectDto, user: User): Promise<Project>;
    updateProjectDto(id: number, status: ProjectStatus, updateProjectDto: UpdateProjectDto, user: User): Promise<Project>;
    deleteProject(id: number, user: User): Promise<void>;
}
