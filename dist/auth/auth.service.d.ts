import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentials } from './dto/auth-credentials.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly userRepo;
    private jwtService;
    private logger;
    constructor(userRepository: Repository<User>, userRepo: UserRepository, jwtService: JwtService);
    signUp(authCredentials: AuthCredentials): Promise<void>;
    signIn(authCredentials: AuthCredentials): Promise<{
        accessToken: string;
    }>;
}
