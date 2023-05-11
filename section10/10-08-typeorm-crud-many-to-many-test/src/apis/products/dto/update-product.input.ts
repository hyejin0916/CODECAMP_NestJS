import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';

@InputType()

// export class UpdateProductInput {
//   @Field(() => String, { nullable: true })
//   name?: string;

//   @Field(() => String, { nullable: true })
//   description?: string;

//   @Min(0)
//   @Field(() => Int, { nullable: true })
//   price?: number;
// }
export class UpdateProductInput extends PartialType(CreateProductInput) {
  // 아래 내용들을 상속받음
  // name?: string
  // description?: string
  // price?: number
}

// PickType(CreateProductInput, ['name', 'price']) => 뽑기
// OmitType(CreateProductInput, ['description']) => 뽑기
// PartialType(CreateProductInput) => 물음표 만들기
