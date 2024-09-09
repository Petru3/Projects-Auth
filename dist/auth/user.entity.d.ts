import { Project } from "src/projects/project.entity";
export declare class User {
    id: number;
    username: string;
    password: string;
    salt: string;
    projects: Project[];
    validatePassword(password: string): Promise<boolean>;
}
