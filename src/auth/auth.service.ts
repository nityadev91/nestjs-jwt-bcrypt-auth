import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";
import { UserDto } from "src/user/user.dto";
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

            // here, password should be takend due to compare with user given password
            const user = await this.userRepository.findOne({ 
                where: { username },
                select: ['id', 'username', 'email', 'password', 'firstName', 'lastName', 'mobile', 'role']
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

    async signUp(UserDto):Promise<any>{
        try{
            const newUser=await this.userRepository.create(UserDto);
            await this.userRepository.save(newUser);
            return { message: 'User created successfully' };
        }
        catch(error){
            // i have to throw already exist message but i am throwing generic message for now
            // throw new UnauthorizedException('Error creating user');
            // special error duplicate entry for username or email
            if (error.code === '23505') {
                throw new UnauthorizedException('Username or email already exists');
            }
            throw new UnauthorizedException('Error creating user');
        }

    }
}