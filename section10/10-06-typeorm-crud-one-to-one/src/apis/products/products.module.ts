import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsSaleslocaionsService } from '../productsSaleslocations/productsSaleslocations.service';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productSaleslocation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSaleslocation, //
    ]),
  ], // 모델에 데이터 저장하기 위해 의존성 주입
  providers: [
    ProductsResolver, //
    ProductsService,
    ProductsSaleslocaionsService,
  ],
})
export class ProductsModule {}
