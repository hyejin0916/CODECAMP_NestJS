import { CreateProductInput } from '../dto/create-product.input';
import { Product } from '../entities/product.entity';

export interface IProductsServiceCreate {
  createProductInput: CreateProductInput;
}

export interface IProductsServiceFindOne {
  productId: string;
}

export interface IProductsServiceCheckSoldout {
  product: Product;
}

export interface IProductServiceDelete {
  productId: string;
}
