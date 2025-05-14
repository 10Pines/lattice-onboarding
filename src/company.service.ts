import { Injectable } from "@nestjs/common";
import { Company } from "./models/company.model";
import { Employee, Status } from "./models/employee.model";
import { DbClient } from "./db.client";


@Injectable()
export class CompanyService {
    constructor(private dbClient: DbClient) {}

    async findAll(): Promise<Company[]> {
        return this.dbClient.companies;
    }
    
    async findOneById(id: number): Promise<Company> {
        const company = this.dbClient.companies.find(company => company.id === id);
        if (!company) {
            throw new Error(`Company with id ${id} not found`);
        }
        return company;
    }

    async findEmployeesByStatus(companyId: number, status: Status): Promise<Employee[]> {
        const company = this.dbClient.companies.find(company => company.id === companyId);
        if (!company) {
            throw new Error(`Company with id ${companyId} not found`);
        }
        return company.employees.filter(employee => employee.status === status);
    }

    async updateEmployeeStatus(employeeId: number, status: Status) {
        const employee = this.dbClient.employees.find(employee => employee.id === employeeId);
        if (!employee) {
            throw new Error(`Employee with id ${employeeId} not found`);
        }
        if (employee.status === Status.INACTIVE && status !== Status.ACTIVE) {
            throw new Error(`Cannot change status from INACTIVE to ${status.toUpperCase()}`);
        }
        employee.status = status;
        return employee;
    }

}
