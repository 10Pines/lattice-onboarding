import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Employee, Status } from "./models/employee.model";
import { CompanyService } from "./company.service";
import { Company } from "./models/company.model";

@Resolver(() => Company)
export class CompanyResolver {
  constructor(
    private companyService: CompanyService
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

}
