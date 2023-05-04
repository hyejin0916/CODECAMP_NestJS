// import { Controller, Get } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';

// @Controller()
@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //
  ) {}

  // @Get('/hello')
  @Query(() => String, { nullable: true }) // return type지정, nullable:true 필수값아님
  getHello(): string {
    return this.boardsService.getHello();
  }
}
