import { Field, ObjectType } from "@nestjs/graphql";
import { Employee } from "./employee.model";

@ObjectType()
export class Company {

  @Field(type => Number)
  id: number;

  @Field(type => String)
  name: string;

  @Field(type => [Employee], { nullable: 'items' })
  employees: Employee[];

}
