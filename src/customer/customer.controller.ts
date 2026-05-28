import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './customer.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('/customers')
export class CustomerController {
    constructor(private customerService: CustomerService) { }

    @UseGuards(JwtAuthGuard)
    @Get('all')
    async findAll() {
        return await this.customerService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addCustomer(@Body() customerData: CustomerDto) {
        console.log("Received customer data:", customerData);
        return await this.customerService.create(customerData);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update')
    async updateCustomer(@Body() customerData: CustomerDto) {
        return await this.customerService.update(customerData);
    }
}
