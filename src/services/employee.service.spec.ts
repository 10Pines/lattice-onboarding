import { EmployeeService } from "./employee.service";
import { Employee, Status } from "../models/employee.model";
import { DbClient } from "./db.client";

describe('CompanyService', () => {
    let employeeService: EmployeeService;

      beforeAll(() => {
        const googleEmployees: Employee[] = [
        { id: 1, firstName: 'John', lastName: 'Doe', status: Status.ACTIVE },
        { id: 2, firstName: 'Jane', lastName: 'Smith', status: Status.CREATED },
        { id: 3, firstName: 'Alice', lastName: 'Johnson', status: Status.INVITED },
        { id: 4, firstName: 'Bob', lastName: 'Brown', status: Status.INACTIVE },
        { id: 5, firstName: 'Charlie', lastName: 'Davis', status: Status.ACTIVE },];
    
        const tenPinesEmployees: Employee[] = [
        { id: 6, firstName: 'Nahuel', lastName: 'Varisco', status: Status.ACTIVE },
        { id: 7, firstName: 'Nayla', lastName: 'Portas', status: Status.CREATED },
        { id: 8, firstName: 'Belén', lastName: 'Amat', status: Status.CREATED },
        { id: 9, firstName: 'Santiago', lastName: 'Paredes', status: Status.INACTIVE }];
    
    
        const mockDbClient = {
          companies : [
          { id: 1, name: '10pines', employees: tenPinesEmployees},
          { id: 2, name: 'Google', employees: googleEmployees}],
          employees: [...googleEmployees, ...tenPinesEmployees],  
        } as DbClient; 
    
        employeeService = new EmployeeService(mockDbClient);
      });
 
    describe('updateEmployeeStatus', () => {
        it('should update the status of an employee from ACTIVE to INACTIVE', async () => {
            const employee = await employeeService.updateStatus(1, Status.INACTIVE);
            expect(employee).toBeDefined();
            expect(employee.status).toBe(Status.INACTIVE);
        });

        it('should throw an error if the employee is not found', async () => {
            await expect(employeeService.updateStatus(999, Status.ACTIVE)).rejects.toThrow(
            'Employee with id 999 not found',
            );
        });

        it('should throw an error if the current update is INACTIVE to CREATED', async () => {
            await expect(employeeService.updateStatus(4, Status.CREATED)).rejects.toThrow(
            'Cannot change status from INACTIVE to CREATED',
            );
        });

        it('should throw an error if the current update is INACTIVE to INVITED', async () => {
            await expect(employeeService.updateStatus(4, Status.INVITED)).rejects.toThrow(
            'Cannot change status from INACTIVE to INVITED',
            );
        });
    });
});
