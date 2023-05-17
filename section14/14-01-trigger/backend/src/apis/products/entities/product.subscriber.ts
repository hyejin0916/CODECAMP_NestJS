import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Product } from './product.entity';

@EventSubscriber() // 나는 트리거이다 를 알려줌
export class ProductSubscriber implements EntitySubscriberInterface {
  // implements: class의 타입을 정의
  constructor(dataSource: DataSource) {
    //DataSource:typeorm과 연결하기 위해 사용
    dataSource.subscribers.push(this); // dataSource에 ProductSubscriber 자기 자신을 등록
  }

  listenTo() {
    return Product; // Product테이블을 구독
  }

  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    // insert가 하나 되고 나서 함수 자동 실행
    console.log(event); // event에 등록한 내용이 들어옴

    const id = event.entity.id;
    const name = event.entity.name;
    const description = event.entity.description;
    const price = event.entity.price;
    const isSoldout = event.entity.isSoldout;

    console.log(`${id}, ${name}, ${description}, ${price}, ${isSoldout}`); // 빅쿼리, 엘라스틱서치(검색전용)에 담기

    // 1. trigger는 언제 사용하면 안될까?
    // 트랜잭션으로 연결된 중요한 내용들...

    // 2. 어떤 것들을 사용하면 좋을까?
    // 메인 로직에 큰 피해를 안끼치는 로직들.. (ex-통계 계산[summary라는 테이블을 만들어놓고 데이터가 추가될때마다 +시키는 형식으로 테이블을 따로 관리], 로그 쌓아놓기)
    // .count(): 코드는 간단하지만 속도가 빠른것은 아님
  }

  //   beforeInsert(event: InsertEvent<any>): void | Promise<any> {
  //       // insert전에 함수 자동 실행하고 insert
  //   }
}
