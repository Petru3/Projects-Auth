import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectStatus } from "./project-status.enum";
import { User } from "src/auth/user.entity";

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.OPEN
    })
    status: ProjectStatus;

    @ManyToOne(
        type => User,
        user => user.projects,
        {eager: false}
    )
    user: User;

    @Column()
    userId: number;
}