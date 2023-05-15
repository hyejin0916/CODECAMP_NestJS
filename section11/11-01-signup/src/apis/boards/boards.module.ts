import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service.js';
import { BoardsResolver } from './boards.resolver.js';

@Module({
  imports: [],
  providers: [
    BoardsResolver, //
    BoardsService,
  ],
})
export class BoardsModule {}
