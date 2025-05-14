import { Injectable } from "@nestjs/common";
import { DbClient } from "./db.client";
import { Status } from "../models/employee.model";

@Injectable()
export class EmployeeService {
    constructor(private dbClient: DbClient) {}

    async updateStatus(employeeId: number, status: Status) {
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