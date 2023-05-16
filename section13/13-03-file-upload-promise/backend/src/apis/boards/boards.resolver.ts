import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { CreateBoardInput } from './dto/create-board.input';

@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //
  ) {}

  @Query(() => [Board], { nullable: true })
  fetchBoards(): Board[] {
    return this.boardsService.findAll();
  }

  @Mutation(() => String)
  createBoard(
    // @Args('writer') writer: string, // writer로 입력받은 데이터를 writer에 저장하게 되고 그 writer은 string 타입
    // @Args('title') title: string,
    // @Args({ name: 'contents', nullable: true }) contents: string, // ? 제거하고 싶을 때
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): string {
    // return this.boardsService.create(writer, title, contents);
    return this.boardsService.create({ createBoardInput });
  }
}
