"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsRepository = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("./project.entity");
const common_1 = require("@nestjs/common");
const project_status_enum_1 = require("./project-status.enum");
let ProjectsRepository = class ProjectsRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(project_entity_1.Project, dataSource.createEntityManager());
        this.dataSource = dataSource;
        this.logger = new common_1.Logger('TaskRepository');
    }
    async getAllProjects(filterDto, user) {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('project');
        query.where('project.userId = :userId', { userId: user.id });
        if (status) {
            query.andWhere('project.status = :status', { status });
        }
        if (search) {
            query.andWhere('(project.title LIKE :search OR project.description LIKE :search)', {
                search: `%${search}%`,
            });
        }
        try {
            const projects = await query.getMany();
            return projects;
        }
        catch (error) {
            this.logger.error(`Failed to get projects for user "${user.username}", DTO: ${JSON.stringify(filterDto)}`, error.stack);
            throw new common_1.InternalServerErrorException();
        }
    }
    async createProject(createProjectDto, user) {
        const { title, description } = createProjectDto;
        const newProject = new project_entity_1.Project();
        newProject.title = title;
        newProject.description = description;
        newProject.status = project_status_enum_1.ProjectStatus.OPEN;
        newProject.user = user;
        try {
            await this.save(newProject);
        }
        catch (error) {
            this.logger.error(`Failed to create a task for user "${user.username}", Data ${createProjectDto}`, error.stack);
            throw new common_1.InternalServerErrorException();
        }
        delete newProject.user;
        return newProject;
    }
    async updateProject(id, updateProjectDto, status, user) {
        const currentProject = await this.findOne({ where: { id } });
        if (!currentProject) {
            throw new common_1.NotFoundException(`Project with ID "${id}" not found`);
        }
        const updatedProject = {
            ...currentProject,
            ...updateProjectDto,
        };
        updatedProject.status = status;
        try {
            return await this.save(updatedProject);
        }
        catch (error) {
            console.error('Error updating project:', error);
            throw new common_1.InternalServerErrorException('Failed to update the project.');
        }
    }
    async deleteProject(id, user) {
        const result = await this.delete({ id });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Project with ID "${id}" not found.`);
        }
    }
};
exports.ProjectsRepository = ProjectsRepository;
exports.ProjectsRepository = ProjectsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ProjectsRepository);
//# sourceMappingURL=projects.repository.js.map