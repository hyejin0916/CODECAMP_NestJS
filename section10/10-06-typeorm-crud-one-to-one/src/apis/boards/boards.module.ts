import { Module } from '@nestjs/common';
import { BoardsResolver } from './boards.resolver';
import { BoardsService } from './boards.service';

@Module({
  imports: [],
  providers: [
    BoardsResolver, //
    BoardsService, //
  ], // AppController에 AppService 넣어줘
  // new AppController(AppService)라는 의미
})
export class BoardsModule {}
