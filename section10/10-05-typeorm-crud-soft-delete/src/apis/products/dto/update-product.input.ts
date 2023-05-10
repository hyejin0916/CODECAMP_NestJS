import { InputType, OmitType, PartialType, PickType } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  // Partial: 속성을 선택사항으로
  // 아래 내용들을 상속받음
  // name?: string;
  // description?: string;
  // price?: number;
}

// PickType(CreateProductInput, ['name', 'description']) // 뽑기
// OmitType(CreateProductInput, ['price']) // 빼기
