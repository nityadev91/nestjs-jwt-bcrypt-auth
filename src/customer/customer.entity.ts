import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn  } from "typeorm";
import { OneToMany } from "typeorm";
import { Vehicle } from "../vehicles/vehicles.entity";
import { ServiceTicket } from "src/service-ticket/service-ticket.entity";
@Entity()
export class Customer{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({unique:true, nullable:false})
    email:String;
    
    @Column({nullable:false})
    mobile:string;

    @Column({})
    firstName:string;

    @Column({})
    lastName:string;

    @OneToMany(()=>Vehicle, vehicle=>vehicle.customer)
    vehicles:Vehicle[];

    @OneToMany(()=>ServiceTicket,ticket=>ticket.customer)
    tickets:ServiceTicket[];

    @CreateDateColumn({select:false})
    createdAt:Date;

    @UpdateDateColumn({select:false})
    updatedAt:Date;
}
