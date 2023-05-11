import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
// import { CreateProductInput } from './dto/create-product.input';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductServiceDelete,
  IProductsServiceCheckSoldout,
  IProductsServiceCreate,
  IProductsServiceFindOne,
} from './interfaces/products-service.interface';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductsSaleslocationsService } from '../productsSaleslocations/productsSaleslocations.service';

// interface IProductsServiceCreate {
//   createProductInput: CreateProductInput;
// } interface 폴더에 따로 만들어 넣어주는 것이 좋음

// interface IProductsServiceFindOne {
//   productId: string;
// }

interface IProductsServiceUpdate {
  productId: string;
  updateProductInput: UpdateProductInput;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, // private readonly가 붙어서 this. ~ 생략
    private readonly productsSaleslocationsService: ProductsSaleslocationsService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSaleslocation'],
    });
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation'],
    });
  }

  // : Promise<Product> 리턴 타입 추가 1
  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    // 1. 상품 하나만 등록할 때 사용하는 방법
    // const result = this.productsRepository.save({
    //   ...createProductInput, // 스프레드 연산자: 한번에 안에 들어있는 속성들 다 포함 시키기

    // });

    // 2. 상품과 상품거래위치를 같이 등록하는 방법
    const { productSaleslocation, ...product } = createProductInput;
    const result = await this.productsSaleslocationsService.create({
      productSaleslocation,
    }); // 서비스를 타고 가야하는 이유는 ?
    //  // 레파지토리에 직접 접근하면 검증 로직을 통일시킬 수 없음

    const result2 = this.productsRepository.save({
      ...product,
      productSaleslocation: result, // result 통째로 넣기 vs. 아이디만 빼서 넣기
    });

    return result2;
  }

  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    // 기존 있는 내용을 재사용하여, 로직을 통일하자 !
    const product = await this.findOne({ productId });

    // 위 코드가 재사용한 코드 -> 주석 처리된 코드보다 안전
    // const product = await this.productsRepository.findOne({
    //   where: { id: productId },
    // });

    // 검증은 서비스에서 !
    this.checkSoldoout({ product });

    // this.productsRepository.create; => DB 접속이랑 관련 없음
    // this.productsRepository.insert; => 결과를 객체로 못 돌려받는 등록 방법
    // this.productsRepository.update; => 결과를 객체로 못 돌려받는 수정 방법

    const result = this.productsRepository.save({
      // result에 기존 데이터 isSoldout 없음
      // update, create 다 됨

      ...product,
      ...updateProductInput,
      // id: productId,
      // isSoldout: product.isSoldout, // 이렇게 넣어주면 수정된 값아니라도 수정된 내용으로 보내줄 수 있음
      // name: updateProductInput.name,
      // price: updateProductInput.price,
      // description: updateProductInput.description,
    });
    return result;
  }
  // checkSoldout을 함수로 만드는 이유 => 수정시, 삭제시 등 같은 검증 로직 사용
  checkSoldoout({ product }: IProductsServiceCheckSoldout): void {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }
    // 위 줄과 같은 코드
    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }

  async delete({ productId }: IProductServiceDelete): Promise<boolean> {
    // 1. 실제 삭제
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false; // 영향이 있으면 true, 없으면 false

    // 2. 소프트 삭제 - isDeleted (삭제가 언제되었는지 모름)
    // this.productsRepository.update({ id: productId }, { isDeleted: true });

    // 3. 소프트 삭제 - deletedAt (초기값은 빈것, 날짜가 적혀져있으면 삭제된 것, 동시에 날짜가 삭제된 날짜)
    // this.productsRepository.update({id: productId}, {deletedAt: new Date()});

    // 4. 소프트 삭제 - TypeORM 내장된 기능 사용 (softRemove)
    // 장점: 배열을 넣어 여러 아이디 한번에 삭제 가능 .softRemove([{id: qqq}, {id: aaa}])
    // 단점: 아이디로만 삭제 가능
    // this.productsRepository.softRemove({ id: productId });

    // 5. 소프트 삭제 - TypeORM 내장된 기능 사용 (softDelete)
    // 장점: 아이디 뿐만 아니라 다른 컬럼으로도 삭제 가능
    // 단점: 한번에 하나씩 지울 수 있음, 여러 아이디 한번에 지우기 불가능
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}

// Promise가 안붙은 것: 시간이 걸리지 않는 작업, Promise가 붙은 것:시간이 걸리는 작업
// Spread 사용하는 이유(...): 수정되지 않은 다른 결과값까지 모두 객체로 돌려받고 싶을 때 사용
