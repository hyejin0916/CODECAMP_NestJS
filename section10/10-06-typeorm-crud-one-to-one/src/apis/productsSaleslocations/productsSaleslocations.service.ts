import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from './entities/productSaleslocation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductSaleslocationInput } from './dto/product-saleslocation.input';

@Injectable()
export class ProductsSaleslocaionsService {
  constructor(
    @InjectRepository(ProductSaleslocation)
    private readonly productsSaleslocationsRepository: Repository<ProductSaleslocation>,
  ) {}

  create(productSaleslocation) {
    return this.productsSaleslocationsRepository.save({
      ...productSaleslocation,
    });
  }
}
