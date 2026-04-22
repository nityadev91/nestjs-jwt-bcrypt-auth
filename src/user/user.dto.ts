// dto/signup.dto.ts
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { UserRole } from './user.entity';


export class UserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
  
  @IsOptional()
  role?: UserRole = UserRole.USER; // defaults to 'user'
}