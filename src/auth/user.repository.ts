import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { AuthCredentials } from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
    private logger = new Logger('AuthRepository')
    constructor(private readonly dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async signUp(
        authCredentials: AuthCredentials
    ): Promise<void> {
        let {username, password} = authCredentials;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hansPassword(password, user.salt);

        try{
            await this.save(user);
        }catch(error) {
            if (error.code === '23505') { // duplicate username
                throw new ConflictException('Username already exists!');
            } else {
                throw new InternalServerErrorException();
            }
        }

        this.logger.debug(`Sucessfully created an account!`);
        
    }

    async ValidateUserPassword(
        authCredentials: AuthCredentials
    ): Promise<string> {
        const { username, password } = authCredentials;

        const user = await this.findOne({where: {username}});

        if(user && await user.validatePassword(password)){
            return user.username;
        } else{
            return null;
        }
    }

    private hansPassword(
        password: string,
        salt: string,
    ): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}