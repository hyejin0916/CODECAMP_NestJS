import { Injectable, Scope } from '@nestjs/common';

// Ingectable scope
// 싱글톤(Scope.DEFAULT) : 한번만 new
// Scope.Request : 매 요청마다 new
// Scope.Transient : 매 주입마다 new

@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
  getHello(): string {
    return 'Hello World!';
  }
}
