import { Injectable, Scope } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductServiceCreate,
  IProductServiceFindOne,
} from './interfaces/products-service.interface';

@Injectable({ scope: Scope.DEFAULT })
export class ProductsService {
  constructor(
    @InjectRepository(Product) // docs에 나와있는 방법
    private readonly productsRepository: Repository<Product>, // 데이터 저장하는 기능을하기위해 제공해주는 repository사용
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne({ productId }: IProductServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  // nest.js에서는 async await을 하지않아도 resolver에서 작업이 끝난것인지 따져줌
  // 시간이 걸리는 작업일 경우, Promise를 return 타입 앞에 붙여주어야한다.
  // Promise가 붙은 것: 시간이 걸리는 작업
  // Promise가 안붙은 것: 시간이 걸리지않는 작업
  create({ createProductInput }: IProductServiceCreate): Promise<Product> {
    const result = this.productsRepository.save({
      ...createProductInput, // 스프레드 연산자
      // 하나 하나 직접 나열하는 방식
      // name: '마우스',
      // description: '좋은 마우스',
      // price: 3000
    });

    return result;
  }
}
