
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  INVITED = 'invited',
  CREATED = 'created',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

registerEnumType(Status, {
  name: 'Status'
});

@ObjectType()
export class Employee {

  @Field(type => Int)
  id: number;

  @Field(type => String)
  firstName: string;

  @Field(type => String)
  lastName: string;

  @Field(type => Status)
  status: Status;

}
