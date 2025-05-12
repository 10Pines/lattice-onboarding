import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Company } from "src/models/company.model";
import { Employee, Status } from "src/models/employee.model";
import { CompanyService } from "src/company.service";

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
