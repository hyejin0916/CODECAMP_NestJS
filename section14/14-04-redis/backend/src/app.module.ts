import { BoardsModule } from './apis/boards/boards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './apis/products/products.module';
import { ProductsCategoriesModule } from './apis/productsCategories/productsCategories.module';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { FilesModule } from './apis/files/files.module';
// import { Board } from './apis/boards/board.entity';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

// forRoot: global 설정
// forFeature: 상세설정
@Module({
  imports: [
    AuthModule,
    BoardsModule,
    FilesModule,
    ProductsModule,
    ProductsCategoriesModule,
    UsersModule,
    ConfigModule.forRoot(),
    // ConfigModule.forRoot(): 환경 변수 또는 구성 설정을 로드하고 사용할 수 있도록 애플리케이션에 구성 모듈을 등록하는 역할을 한다.
    // 이 메서드를 사용하면 환경 변수나 구성 파일에서 설정 값을 가져와 애플리케이션 전체에서 사용할 수 있게 된다.
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }), // req는 기본적으로 들어오지만, res는 이걸 작성해야만 들어옴
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
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'http://localhost:3000',
      isGlobal: true,
    }),
  ],
})
export class AppModule {}

// ODM & ORM
// - ODM ( Object Document Mapping )
//: NoSQL에서 Document Database를 지원하기 위해 데이터를 변환하는 프로그래밍 기법
// - ORM ( Object Relational Mapping )
// : 데이터베이스와 객체 지향 프로그래밍 언어 간의 호환되지 않는 데이터를 변환하는 프로그래밍 기법
