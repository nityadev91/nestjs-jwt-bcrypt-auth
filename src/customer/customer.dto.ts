import { IsEmail, IsNotEmpty } from "class-validator";

export class CustomerDto{
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    mobile:string

    @IsNotEmpty()
    firstName:string

    @IsNotEmpty()
    lastName:string
}