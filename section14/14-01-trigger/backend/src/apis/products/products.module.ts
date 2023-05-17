import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { ProductsSaleslocationsService } from '../productsSaleslocations/productsSaleslocations.service';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productSaleslocation.entity';
import { ProductsTagsService } from '../productsTags/productsTags.service';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { ProductSubscriber } from './entities/product.subscriber';

// import 모듈: 해당 모듈에서 사용할 외부 모듈 설정, 'TypeOrmModule'은 NestJS에서 TypeORM을 사용할 수 있도록 도와주는 모듈
// forFeature([Product]): TypeORM에서 특정 엔티티를 사용하기 위해 설정하는 메소드, 'Product' 엔티티를 forFeature() 메소드에 등록하여 ProductsModule에서 해당 엔티티를 사용할 수 있게 됨
// 즉, imports: [TypeOrmModule.forFeature([Product])], 는 'ProductsModule'에서 'Product' 엔티티를 사용할 수 있도록 설정하는 코드

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSaleslocation,
      ProductTag,
    ]),
  ],
  providers: [
    ProductSubscriber,
    ProductsResolver, //
    ProductsService,
    ProductsSaleslocationsService,
    ProductsTagsService,
  ], // ProductsResolver, ProductsService 주입
})
export class ProductsModule {}
