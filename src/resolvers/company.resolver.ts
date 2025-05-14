import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Employee, Status } from "../models/employee.model";
import { CompanyService } from "../services/company.service";
import { Company } from "../models/company.model";
import { EmployeeService } from "../services/employee.service";

@Resolver(() => Company)
export class CompanyResolver {
  constructor(
    private companyService: CompanyService,
    private employeeService: EmployeeService,
  ) {}

  @Query(() => Company)
  async company(@Args('id', { type: () => Int }) id: number) {
    return this.companyService.findOneById(id);
  }

  @Query(() => [Company])
  async companies() {
    return this.companyService.findAll();
  }

  @ResolveField(() => [Employee], { nullable: true })
  async employees(
    @Parent() company: Company,
    @Args('status', { type: () => Status, nullable: true }) status?: Status,
  ) {
    if (status) {
      return this.companyService.findEmployeesByStatus(company.id, status);
    }
    return company.employees;
  }

  @Mutation(() => Employee)
  async updateEmployeeStatus(
    @Args('employeeId', { type: () => Int }) employeeId: number,
    @Args('status', { type: () => Status }) status: Status) {
    return this.employeeService.updateStatus(employeeId, status);
  }
}
