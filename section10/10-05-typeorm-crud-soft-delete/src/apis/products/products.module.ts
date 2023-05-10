import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
    ]),
  ], // 모델에 데이터 저장하기 위해 의존성 주입
  providers: [
    ProductsResolver, //
    ProductsService,
  ],
})
export class ProductsModule {}
