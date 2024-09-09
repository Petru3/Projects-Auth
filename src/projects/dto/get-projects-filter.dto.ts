import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { ProjectStatus } from "../project-status.enum";

export class GetProjectsFilterDto {
    
    @IsOptional()
    @IsNotEmpty()
    @IsIn(
        [
            ProjectStatus.HIDDEN,
            ProjectStatus.OPEN
        ]
    )
    status: ProjectStatus

    @IsOptional()
    @IsNotEmpty()
    search: string;
}