import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { Company } from "src/models/company.model";
import { CompanyService } from "src/services/company.service";

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

}
