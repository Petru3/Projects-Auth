import { ProjectStatus } from "./project-status.enum";
import { User } from "src/auth/user.entity";
export declare class Project {
    id: number;
    title: string;
    description: string;
    status: ProjectStatus;
    user: User;
    userId: number;
}
