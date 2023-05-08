import { ProductCategory } from 'src/apis/productsCategories/entities/productcategory.entity';
import { ProductSaleslocation } from 'src/apis/productsSaleslocations/entities/productSaleslocation.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: false })
  isSoldput: boolean;

  @JoinColumn() // onetoone일때, 주체가 되는 모델에 작성
  @OneToOne(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  @ManyToOne(() => ProductCategory) // 앞의 many가 현재 모델, 뒤의 one이 연결될 모델
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  user: User;

  @JoinTable() // ManytoMany일때 하나의 모델에 작성
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  productTags: ProductTag[];
}
