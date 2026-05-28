import { } from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Double } from 'typeorm';

export enum UserRole {
    OWNER = 'owner',
    SUPER_ADMIN = 'super_admin',
    ADMIN = 'admin',
    USER = 'user',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, nullable:false })
    username: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column({ unique: true, nullable: false }) 
    mobile?: string;

    @Column({ select: false }) // Exclude password from query results by default
    password: string; 

    @Column({})
    firstName: string;

    @Column({})
    lastName: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({select:false, nullable: true})
    lastSeenAt: Date;

    @Column({ type:'enum',enum:UserRole, default: UserRole.USER })
    role: UserRole;

    @CreateDateColumn({select: false})
    joinedAt: Date;

    @UpdateDateColumn({select: false})
    updatedAt: Date;  
} 