import { Injectable } from "@nestjs/common";
import { Company } from "src/models/company.model";
import { Employee, Status } from "src/models/employee.model";

@Injectable()
export class CompanyService {

    private googleEmployees: Employee[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', status: Status.ACTIVE },
    { id: 2, firstName: 'Jane', lastName: 'Smith', status: Status.CREATED },
    { id: 3, firstName: 'Alice', lastName: 'Johnson', status: Status.INVITED },
    { id: 4, firstName: 'Bob', lastName: 'Brown', status: Status.INACTIVE }];

    private tenPinesEmployees: Employee[] = [
    { id: 1, firstName: 'Nahuel', lastName: 'Varisco', status: Status.ACTIVE },
    { id: 2, firstName: 'Nayla', lastName: 'Portas', status: Status.CREATED },
    { id: 3, firstName: 'Belén', lastName: 'Amat', status: Status.INVITED },
    { id: 4, firstName: 'Santiago', lastName: 'Paredes', status: Status.INACTIVE }];

    private companies: Company[] = [
    { id: 1, name: '10pines', employees: this.tenPinesEmployees},
    { id: 2, name: 'Google', employees: this.googleEmployees },];

    async findAll(): Promise<Company[]> {
        return this.companies;
    }
    
    async findOneById(id: number): Promise<Company> {
        const company = this.companies.find(company => company.id === id);
        if (!company) {
            throw new Error(`Company with id ${id} not found`);
        }
        return company;
    }

}
