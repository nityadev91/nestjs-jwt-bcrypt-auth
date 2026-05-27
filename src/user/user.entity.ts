import { } from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Double } from 'typeorm';

export enum UserRole {
    SUPER_ADMIN = 'super_admin',
    ADMIN = 'admin',
    USER = 'user',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ unique: true, nullable: false }) 
    mobile?: string;

    @Column({ select: false }) // Exclude password from query results by default
    password: string; 

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ default: true })
    is_active: boolean;

    @Column({nullable: true})
    last_seen_at: Date;

    @Column({ default: UserRole.USER })
    role: UserRole;

    @CreateDateColumn({select: false})
    joined_at: Date;

    @UpdateDateColumn({select: false})
    updated_at: Date;  
} 