import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async signIn(username: string, password: string): Promise<any> {
        try {
            const user = await this.userRepository.findOne({ 
                where: { username },
                select: ['id', 'username', 'password', 'email', 'role']
             });
            
            // Check user existence and password
            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new UnauthorizedException('Invalid credentials');
            }
            const payload = { username: user.username, sub: user.id, email: user.email, role: user.role };
            const token = await this.jwtService.signAsync(payload);
            return { user, token };
        } catch (error) {
            throw new UnauthorizedException('Invalid credentials');
        }

    }
}