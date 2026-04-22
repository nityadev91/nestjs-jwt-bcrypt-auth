import { Get, Inject, Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable() // This decorator marks the class as a provider that can be injected into other classes
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

    ) { }
    async findOneByUsername(username: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { username: username } });
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async create(userDto: UserDto): Promise<any> {
        const { password, ...userData } = userDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        try {
            const newUserInstance = this.userRepository.create({ ...userData, password: hashedPassword });
            const newUser = await this.userRepository.save(newUserInstance);
            return { status: "created", message: "User created successfully", data: newUser };
        } catch (error:any) {
            if (error.code === '23505') { // Unique violation error code for PostgreSQL
                throw new ConflictException('Username or email already exists');
            }
        }
    }
    async createMany(users: User[]): Promise < User[] > {
            return await this.userRepository.save(users);
        }

        findOne(id: string): Promise < User | null > {
            return this.userRepository.findOne({ where: { id } });
        }

    async update(username: string, updateData: Partial<User>): Promise < any > {
            const user = await this.userRepository.findOne({ where: { username } });
            console.log("Found user for update:", user);
            if(!user) {
                throw new NotFoundException(`User ${username} not found`);
            }
        const salt = await bcrypt.genSalt();
            if(updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }

        return await this.userRepository.update(user.id, updateData).then(() => this.findOne(user.id));
    }

    async remove(username: string): Promise<any> {
        return await this.userRepository.delete(username).then(() => { `Deleted": ${username}` });

    }

}