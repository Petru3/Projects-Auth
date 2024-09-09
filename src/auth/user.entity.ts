import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import  * as bcrypt from 'bcrypt';
import { Project } from "src/projects/project.entity";

@Entity()
@Unique(['username'])
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(
        type => Project,
        project => project.user,
        {eager: true}
    )
    projects: Project[]

    async validatePassword(
        password: string
    ): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}