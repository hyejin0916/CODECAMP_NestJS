import { Module } from '@nestjs/common';
import { BoardsModule } from './apis/boards/boards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './apis/products/products.module';
import { ProductsCategoriesModule } from './apis/productsCategories/productsCategories.module';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
// import { Board } from './apis/boards/board.entity';

@Module({
  imports: [
    AuthModule,
    BoardsModule,
    ProductsModule,
    ProductsCategoriesModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'gpwls6240',
      database: 'myproject',
      // entities: [Board],
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}

// ODM & ORM
// - ODM ( Object Document Mapping )
//: NoSQL에서 Document Database를 지원하기 위해 데이터를 변환하는 프로그래밍 기법
// - ORM ( Object Relational Mapping )
// : 데이터베이스와 객체 지향 프로그래밍 언어 간의 호환되지 않는 데이터를 변환하는 프로그래밍 기법
