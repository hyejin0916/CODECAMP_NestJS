import { Injectable, Scope } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { IBoardsServiceCreate } from './interfaces/boards-service.interface';

// Ingectable scope
// 싱글톤(Scope.DEFAULT) : 한번만 new
// Scope.Request : 매 요청마다 new
// Scope.Transient : 매 주입마다 new

@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
  findAll(): Board[] {
    const result = [
      {
        number: 1,
        writer: '철수',
        title: '제목입니다.',
        contents: '내용입니다.',
      },
      {
        number: 2,
        writer: '영희',
        title: '제목2입니다.',
        contents: '내용2입니다.',
      },
      {
        number: 3,
        writer: '훈이',
        title: '제목3입니다.',
        contents: '내용3입니다.',
      },
    ];

    return result;
  }

  create({ createBoardInput }: IBoardsServiceCreate): string {
    console.log(createBoardInput.writer);
    console.log(createBoardInput.title);
    console.log(createBoardInput.contents);

    return '게시물 등록 성공';
  }
}
