import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "./customer.entity";
import { Repository } from "typeorm";
import { CustomerDto } from "./customer.dto";

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>
    ) { }

    async create(customerDto: CustomerDto): Promise<any> {
        const existingUser=await this.customerRepository.findOne({where:{email:customerDto.email}});
        if (existingUser) {
            return { status: "error", message: "Customer with this email already exists" };
        }
        const newCustomer = this.customerRepository.create(customerDto);
        return await this.customerRepository.save(newCustomer);
    }

    async findAll(): Promise<Customer[]> {
        return await this.customerRepository.find();
    }

    async update(customerDto: CustomerDto): Promise<any> {
        const customer = await this.customerRepository.findOne({
            where: {
                email: customerDto.email,
            }
        });
        if (!customer) {
            return { status: "error", message: "Customer not found" };
        }
        return await this.customerRepository.update(customer.id, customerDto).then(() => this.customerRepository.findOne({ where: { id: customer.id } }));
    }
}