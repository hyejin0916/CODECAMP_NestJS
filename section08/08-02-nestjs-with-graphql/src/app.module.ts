import { Module } from '@nestjs/common';
import { BoardsModule } from './apis/boards/boards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    BoardsModule,
    // ProductsModule,
    // UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // GraphQL모듈을 사용하기 위해 작성
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql', // 자동으로 스키마 파일 생성(스웨거같은 명세서 작성)
    }),
  ], //module을 합치는 것
})
export class AppModule {}
