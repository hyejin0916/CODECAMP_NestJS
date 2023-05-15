import { Field, InputType } from '@nestjs/graphql';

// 입력으로 들어오는 부분
@InputType()
export class CreateBoardInput {
  @Field(() => String)
  writer: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  contents: string;
}
