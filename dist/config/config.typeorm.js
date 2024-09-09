"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmConfig = void 0;
const config = require("config");
const user_entity_1 = require("../auth/user.entity");
const project_entity_1 = require("../projects/project.entity");
const dbConfig = config.get('db');
exports.TypeOrmConfig = {
    type: dbConfig.type,
    host: process.env.RDS_HOST || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DATABASE || dbConfig.database,
    entities: [project_entity_1.Project, user_entity_1.User],
    synchronize: true
};
//# sourceMappingURL=config.typeorm.js.map