
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ExampleResolver } from './example.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
       graphiql: true,
       autoSchemaFile: true, // Para generar el esquema automáticamente en memoria
    }),
  ],
  providers: [ExampleResolver],
})
export class AppModule {}
