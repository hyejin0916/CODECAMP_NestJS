import { Field, InputType } from '@nestjs/graphql';

@InputType() // 들어오는 데이터는 InputType, return 되는 데이터는 ObjectType를 사용해 객체로 변환
export class CreateBoardInput {
  @Field(() => String)
  writer: string;
  @Field(() => String)
  title: string;
  @Field(() => String)
  contents: string;
}
