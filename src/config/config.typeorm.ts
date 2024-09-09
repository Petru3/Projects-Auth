import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config'
import { User } from "src/auth/user.entity";
import { Project } from "src/projects/project.entity";

const dbConfig = config.get('db')

export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RDS_HOST || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username, 
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DATABASE || dbConfig.database,
    entities: [Project, User],
    synchronize: true
}