import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('login')
    signIn(@Body() { username, password }: { username: string; password: string }) {
        // Implementation for signing in a user
        return this.authService.signIn(username, password);
    }

    @Post('signup')
    signUp(@Body() userDto:UserDto){
        return this.authService.signUp(userDto);
    }
}
