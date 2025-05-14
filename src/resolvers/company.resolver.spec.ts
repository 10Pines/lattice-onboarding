import { Test, TestingModule } from '@nestjs/testing';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from '../services/company.service';
import { Status } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

describe('CompanyResolver', () => {
  let resolver: CompanyResolver;
  let companyService: CompanyService;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    const mockCompanyService = {
      findOneById: jest.fn(),
      findAll: jest.fn(),
      findEmployeesByStatus: jest.fn(),
    };

    const mockEmployeeService = {
      updateStatus: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyResolver,
        {
          provide: CompanyService,
          useValue: mockCompanyService,
        },
        {
          provide: EmployeeService,
          useValue: mockEmployeeService,
        },
      ],
    }).compile();

    resolver = module.get<CompanyResolver>(CompanyResolver);
    companyService = module.get<CompanyService>(CompanyService);
    employeeService = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('company', () => {
    it('should call findOneById with the correct ID', async () => {
      const mockCompany = { id: 2, name: '10pines', employees: [] };
      (companyService.findOneById as jest.Mock).mockResolvedValue(mockCompany);

      const result = await resolver.company(2);

      expect(companyService.findOneById).toHaveBeenCalledWith(2); 
      expect(companyService.findOneById).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCompany);
    });
  });

  describe('companies', () => {
    it('should call findAll once', async () => {
      const mockCompanies = [
        { id: 1, name: 'Google', employees: [] },
        { id: 2, name: '10pines', employees: [] },
      ];
      (companyService.findAll as jest.Mock).mockResolvedValue(mockCompanies);

      const result = await resolver.companies();

      expect(companyService.findAll).toHaveBeenCalledTimes(1); 
      expect(result).toEqual(mockCompanies);
    });
  });

  describe('employees', () => {
    it('should call findEmployeesByStatus with the correct arguments', async () => {
      const mockEmployees = [
        { id: 1, firstName: 'John', lastName: 'Doe', status: Status.ACTIVE },
      ];
      (companyService.findEmployeesByStatus as jest.Mock).mockResolvedValue(mockEmployees);
      const mockCompany = { id: 1, name: 'Google', employees: [] };
      
      const result = await resolver.employees(mockCompany, Status.ACTIVE);

      expect(companyService.findEmployeesByStatus).toHaveBeenCalledWith(1, Status.ACTIVE); 
      expect(companyService.findEmployeesByStatus).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockEmployees); 
    });

    it('should return all employees if no status is provided', async () => {
      const mockCompany = {
        id: 1,
        name: 'Google',
        employees: [
          { id: 1, firstName: 'John', lastName: 'Doe', status: Status.ACTIVE },
          { id: 2, firstName: 'Jane', lastName: 'Smith', status: Status.INACTIVE },
        ],
      };

      const result = await resolver.employees(mockCompany);

      expect(companyService.findEmployeesByStatus).not.toHaveBeenCalled(); 
      expect(result).toEqual(mockCompany.employees); 
    });

    it('should updateStatus', async () => {
      await resolver.updateEmployeeStatus(1, Status.INACTIVE);

      expect(employeeService.updateStatus).toHaveBeenCalledWith(1, Status.INACTIVE); 
      expect(employeeService.updateStatus).toHaveBeenCalledTimes(1);
    });
  });
});
