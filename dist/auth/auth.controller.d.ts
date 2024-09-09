import { AuthService } from './auth.service';
import { AuthCredentials } from './dto/auth-credentials.dto';
import { User } from './user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(authCredentials: AuthCredentials): Promise<void>;
    signIn(authCredentials: AuthCredentials): Promise<{
        accessToken: string;
    }>;
    test(user: User): void;
}
