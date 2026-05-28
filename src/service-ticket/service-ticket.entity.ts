import { Customer } from "src/customer/customer.entity";
import { Bills } from "src/bills/bills.entity";
import { Vehicle } from "src/vehicles/vehicles.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum WorkOrderStatus {
    SCHEDULED = 'scheduled',
    CHECKED_IN = 'checked_in',
    DIAGNOSING = 'diagnosing',
    AWAITING_APPROVAL = 'awaiting_approval',
    IN_PROGRESS = 'in_progress',
    AWAITING_PARTS = 'awaiting_parts',
    QUALITY_CHECK = 'quality_check',
    READY_FOR_PICKUP = 'ready_for_pickup',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

@Entity()
export class ServiceTicket {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(()=>Customer, customer=>customer.tickets)
    customer:Customer;

    @OneToOne(()=>Vehicle, vehicle=>vehicle.ticket)
    @JoinColumn({})
    vehicle:Vehicle;

    @OneToMany(()=>Bills,bills=>bills.ticket)
    bill:Bills[];

    @Column({type:'enum', enum:WorkOrderStatus,default:WorkOrderStatus.AWAITING_APPROVAL})
    status:WorkOrderStatus;
}