import { Injectable } from "@nestjs/common";
import { Company } from "./models/company.model";
import { Employee, Status } from "./models/employee.model";

@Injectable()
export class CompanyService {

    // Utilizo temporalmente datos en memoria para simular una base de datos
    private googleEmployees: Employee[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', status: Status.ACTIVE },
    { id: 2, firstName: 'Jane', lastName: 'Smith', status: Status.CREATED },
    { id: 3, firstName: 'Alice', lastName: 'Johnson', status: Status.INVITED },
    { id: 4, firstName: 'Bob', lastName: 'Brown', status: Status.INACTIVE },
    { id: 5, firstName: 'Charlie', lastName: 'Davis', status: Status.ACTIVE },];

    private tenPinesEmployees: Employee[] = [
    { id: 6, firstName: 'Nahuel', lastName: 'Varisco', status: Status.ACTIVE },
    { id: 7, firstName: 'Nayla', lastName: 'Portas', status: Status.CREATED },
    { id: 8, firstName: 'Belén', lastName: 'Amat', status: Status.CREATED },
    { id: 9, firstName: 'Santiago', lastName: 'Paredes', status: Status.INACTIVE }];

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

    async findEmployeesByStatus(companyId: number, status: Status): Promise<Employee[]> {
        const company = this.companies.find(company => company.id === companyId);
        if (!company) {
            throw new Error(`Company with id ${companyId} not found`);
        }
        return company.employees.filter(employee => employee.status === status);
    }

    async updateEmployeeStatus(employeeId: number, status: Status) {
        const allEmployees = [...this.googleEmployees, ...this.tenPinesEmployees];
        const employee = allEmployees.find(employee => employee.id === employeeId);
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
