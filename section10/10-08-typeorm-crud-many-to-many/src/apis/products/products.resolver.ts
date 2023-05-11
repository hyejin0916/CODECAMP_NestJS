import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService, //
  ) {}

  @Query(() => [Product])
  fetchProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ): Promise<Product> {
    return this.productsService.findOne({ productId });
  }

  @Mutation(() => Product) // Graphql용
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    // : Promise<Product> 리턴 타입 추가 2
  ): Promise<Product> {
    // 브라우저에 결과를 보내주는 2가지 방법
    // 1. 등록된 내용에 담긴 객체를 그대로 브라우저에 돌려보내주기
    return this.productsService.create({ createProductInput }); // return이 있어야 브라우저한테 보내줌
    // service에서 await을 사용하지 않아도 nest는 여기서 자동으로 데이터가 저장될때까지 기다려준다.

    // 2. 등록에 성공했다는 결과 메세지만 간단히 보내주기
    // return '상품이 정상적으로 등록되었습니다.'
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<void> {
    return this.productsService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productID') productId: string, //
  ): Promise<boolean> {
    return this.productsService.delete({ productId });
  }
}
