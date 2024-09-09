import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentials } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {

    private logger = new Logger('AuthService');
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly userRepo: UserRepository,

        private jwtService: JwtService
    ) {}

    async signUp(
        authCredentials: AuthCredentials
    ): Promise<void> {
        return this.userRepo.signUp(authCredentials);
    }

    async signIn(
        authCredentials: AuthCredentials
    ): Promise<{ accessToken: string }> {
        const username = await this.userRepo.ValidateUserPassword(authCredentials);

        if(!username) {
            throw new UnauthorizedException ('Invalid credentials')
        }

        const payload: JwtPayload = {username};
        const accessToken = await this.jwtService.sign(payload);
    
        this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`);

        return { accessToken };
    }

}
