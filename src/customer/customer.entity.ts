import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn  } from "typeorm";

@Entity()
export class Customer{
    @PrimaryGeneratedColumn()
    id:string;

    @Column()
    mobile:Number;

    @Column({name:'first_name'})
    firstName:string;

    @Column({name:'last_name'})
    lastName:string;

    @CreateDateColumn({select:false,name:'created_at'})
    createdAt:Date;

    @CreateDateColumn({select:false,name:'updated_at'})
    updatedAt:Date;
}
