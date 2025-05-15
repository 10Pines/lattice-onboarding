import { Injectable } from "@nestjs/common";
import { Company } from "../models/company.model";
import { Employee, Status } from "../models/employee.model";

@Injectable()
export class DbClient {

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

    companies: Company[] = [
    { id: 1, name: '10pines', employees: this.tenPinesEmployees},
    { id: 2, name: 'Google', employees: this.googleEmployees },];

    employees: Employee[] = [...this.googleEmployees, ...this.tenPinesEmployees];
}
