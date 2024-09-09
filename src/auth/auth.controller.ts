import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentials } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    signUp(
        @Body(ValidationPipe) authCredentials: AuthCredentials
    ): Promise<void> {
        return this.authService.signUp(authCredentials);
    }

    @Post('/signin')
    signIn(
        @Body(ValidationPipe) authCredentials: AuthCredentials
    ): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentials);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(
        @GetUser() user: User
    ) {
        console.log(user);
    }
}
