import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { Cache } from 'cache-manager';

@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => String, { nullable: true })
  async fetchBoards(): Promise<string> {
    // 1. 조회하는 연습
    const mycache = await this.cacheManager.get('qqq');
    console.log('mycache', mycache);
    // 레디스 연습을 위해서 잠시 주석걸기
    // return this.boardsService.findAll();
    // 2. 조회완료 메세지 전달
    return '조회완료';
  }

  @Mutation(() => String)
  async createBoard(
    // @Args('writer') writer: string, // writer로 입력받은 데이터를 writer에 저장하게 되고 그 writer은 string 타입
    // @Args('title') title: string,
    // @Args({ name: 'contents', nullable: true }) contents: string, // ? 제거하고 싶을 때
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): Promise<string> {
    // 1. 캐시에 등록하는 연습
    await this.cacheManager.set('qqq', createBoardInput, 0);

    // 2. 등록 완료 메시지 전달
    return '캐시에 등록 완료';
    // return this.boardsService.create(writer, title, contents);

    // 레디스 연습을 위해서 잠시 주석걸기
    // return this.boardsService.create({ createBoardInput });
  }
}
