import { ServiceTicket } from "src/service-ticket/service-ticket.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum PaymentStatus{
    FAILED='failed',
    SUCCEED='succeed',
}
@Entity()
export class Bills{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    transactionId:string;

    @Column()
    referenceId:string;

    @Column()
    amounts:number;

    @Column({type:'enum',enum:PaymentStatus})
    status:PaymentStatus;

    @ManyToOne(()=>ServiceTicket,ticket=>ticket.bill)
    ticket:ServiceTicket;

    @CreateDateColumn()
    createdAt:Date;

}