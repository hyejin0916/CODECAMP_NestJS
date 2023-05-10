import { Module } from '@nestjs/common';
import { BoardsModule } from './apis/boards/boards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './apis/boards/entities/board.entity';
import { ProductsModule } from './apis/products/products.module';

@Module({
  imports: [
    BoardsModule,
    ProductsModule,
    // UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // GraphQL모듈을 사용하기 위해 작성
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql', // 자동으로 스키마 파일 생성(스웨거같은 명세서 작성)
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'gpwls6240',
      database: 'myproject',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true, // entity의 내용과 테이블 내용을 동기화시키는 것
      logging: true,
    }),
  ], // module을 합치는 것
})
export class AppModule {}
