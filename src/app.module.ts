
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CompanyResolver } from './resolvers/company.resolver';
import { CompanyService } from './services/company.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
       graphiql: true,
       autoSchemaFile: true, // Para generar el esquema automáticamente en memoria
    }),
  ],
  providers: [CompanyResolver, CompanyService],
})
export class AppModule {}
