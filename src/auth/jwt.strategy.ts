import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not set in configuration');
    }

    super({
      // Extracts the Bearer token from the 'Authorization' header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret, // Use environment variables in production!
    });
  }

  // If the token is valid, this method is called automatically
  async validate(payload: any) {
    // The returned object is attached to the Request as 'req.user'
    return { userId: payload.sub, username: payload.username };
  }
}