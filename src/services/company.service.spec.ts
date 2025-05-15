import { CompanyService } from './company.service';
import { DbClient } from './db.client';
import { Employee, Status } from '../models/employee.model';

describe('CompanyService', () => {
  let companyService: CompanyService;

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

    companyService = new CompanyService(mockDbClient);
  });


  describe('findAll', () => {
    it('should return all companies', async () => {
      const companies = await companyService.findAll();
      expect(companies).toHaveLength(2); 
      expect(companies[0].name).toBe('10pines'); 
      expect(companies[1].name).toBe('Google');
    });
  });

  describe('findOneById', () => {
    it('should return a company by ID', async () => {
      const company = await companyService.findOneById(1);
      expect(company).toBeDefined();
      expect(company.name).toBe('10pines');
    });

    it('should throw an error if the company is not found', async () => {
      await expect(companyService.findOneById(999)).rejects.toThrow(
        'Company with id 999 not found',
      );
    });
  });

  describe('findEmployeesByStatus', () => {
    it('should return employees with the specified status', async () => {
      const employees = await companyService.findEmployeesByStatus(1, Status.ACTIVE);
      expect(employees).toHaveLength(1);
      expect(employees[0].firstName).toBe('Nahuel'); 
    });

    it('should return an empty array if no employees match the status', async () => {
      const employees = await companyService.findEmployeesByStatus(1, Status.INVITED);
      expect(employees).toHaveLength(0); 
    });

    it('should throw an error if the company is not found', async () => {
      await expect(companyService.findEmployeesByStatus(999, Status.ACTIVE)).rejects.toThrow(
        'Company with id 999 not found',
      );
    });
  });
});
