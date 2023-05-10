import {
  HttpException,
  HttpStatus,
  Injectable,
  Scope,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductServiceCheckSoldout,
  IProductServiceCreate,
  IProductServiceFindOne,
  IProductsServiceUpdate,
} from './interfaces/products-service.interface';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable({ scope: Scope.DEFAULT })
export class ProductsService {
  constructor(
    @InjectRepository(Product) // docs에 나와있는 방법
    private readonly productsRepository: Repository<Product>, // 데이터 저장하는 기능을 하기 위해 제공해주는 repository사용
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne({ productId }: IProductServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  // nest.js에서는 async await을 하지않아도 resolver에서 작업이 끝난 것 인지 따져줌
  // 시간이 걸리는 작업일 경우, Promise를 return 타입 앞에 붙여주어야 한다.
  // Promise가 붙은 것: 시간이 걸리는 작업
  // Promise가 안붙은 것: 시간이 걸리지 않는 작업
  create({ createProductInput }: IProductServiceCreate): Promise<Product> {
    const result = this.productsRepository.save({
      ...createProductInput, // 스프레드 연산자
      // 하나 하나 직접 나열하는 방식
      // name: '마우스',
      // description: '좋은 마우스',
      // price: 3000
    });

    return result;
  }

  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    // 기존에 있는 내용을 재사용하여 로직 통일화
    const product = await this.findOne({ productId });

    // 검증은 서비스에서
    this.checkSoldout({ product });
    // this.productsRepository.create; // DB접속이랑 관련 없음 - 빈 객체 하나 만드는 것
    // this.productsRepository.insert; // 결과 안 받아옴, 등록 결과 안보내줘도 될 때 사용
    // this.productsRepository.update; // 결과 안 받아옴, 등록 결과 안보내줘도 될 때 사용

    // save: DB에 접속해 등록된 정보를 받아와 저장할 수 있다.
    // save할때 id가 있다면 수정, 없다면 등록
    const result = this.productsRepository.save({
      ...product, // 수정 후, 수정되지 않은 다른 결과 값까지 모두 객체로 돌려 받고싶을 때,
      ...updateProductInput,
    }); // nest.js에서는 같은 변수가 두번 선언되면 앞의 변수는 무시되고 뒤에껄로 실행됨
    return result;
  }

  // checkSoldout를 함수로 만드는 이유 => 수정 삭제 시 같은 검증 로직 사용
  checkSoldout({ product }: IProductServiceCheckSoldout): void {
    // void: return이 없는 경우
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
      // 아래 줄 실행하지않고 바로 에러를 브라우저로 던져줌.
    }
    // # 방법2
    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   ); // 에러를 던진다
    // }
  }

  async delete({ productId }: IProductServiceDelete): Promise<boolean> {
    // 1. DB에서 실제로 삭제
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false;
    // affected: 실제로 영향이 갔는지 안갔는지
    //
    // 2. 소프트 삭제(직접 구현) - isDeleted 속성을 추가해서 삭제된 경우 true로
    // this.productsRepository.update({ id: productId }, { isDeleted: true }); // productId인 이의 isDeleted를 true로 업데이트(현재 컬럼없음)
    //
    // 3. 소프트 삭제(직접 구현) - deletedAt
    // this.productsRepository.update(
    //   { id: productId },
    //   { deletedAt: new Date() },
    // );
    //
    // 4. 소프트 삭제(TypeORM 제공) - softRemove
    // this.productsRepository.softRemove({id:productId})
    // 장점: 여러 id를 한번에 삭제 가능 & 단점: id로만 삭제 가능
    //      [{id: qqq1}, {id: qqq2}, {id: qqq3}]
    //
    // 5. 소프츠 삭제(TypeORM 제공) - softDelete
    const result = await this.productsRepository.softDelete({ id: productId });
    // 장점: id포함 다른 컬럼으로도 삭제 가능 & 단점: 여러 id 한번에 삭제 불가능

    return result.affected ? true : false;
  } // async/await을 사용하여 삭제하는 것을 기다린다
}

interface IProductServiceDelete {
  productId: string;
}
