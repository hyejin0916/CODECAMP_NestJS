import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSaleslocation } from '../entities/productSaleslocation.entity';

// id가 빠진 input type으로 변경
@InputType()
export class ProductSaleslocationInput extends OmitType(
  ProductSaleslocation,
  ['id'],
  InputType,
) {}
