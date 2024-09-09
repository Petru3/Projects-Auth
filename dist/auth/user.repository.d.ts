import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentials } from "./dto/auth-credentials.dto";
export declare class UserRepository extends Repository<User> {
    private readonly dataSource;
    private logger;
    constructor(dataSource: DataSource);
    signUp(authCredentials: AuthCredentials): Promise<void>;
    ValidateUserPassword(authCredentials: AuthCredentials): Promise<string>;
    private hansPassword;
}
