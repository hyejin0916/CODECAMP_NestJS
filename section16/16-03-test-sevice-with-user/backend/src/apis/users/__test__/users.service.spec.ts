// users.service.spec.ts

import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

// 나만의 데이터베이스 만들기
class MockUsersRepository {
  mydb = [
    { email: 'a@a.com', password: '0000', name: '짱구', age: 8 },
    { email: 'qqq@qqq.com', password: '1234', name: '철수', age: 12 },
  ];

  findOne({ where }) {
    const users = this.mydb.filter((el) => el.email === where.email);
    if (users.length) return users[0];
    return null;
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const usersModule = await Test.createTestingModule({
      // imports: [TypeOrmModule...],
      // controllers: [],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User), // 원래 user가 들어가야하는 자리에
          useClass: MockUsersRepository, // MockUsersRepository넣어줘
        },
      ],
    }).compile();

    usersService = usersModule.get<UsersService>(UsersService);
  });

  //   describe('findOneByEmail', () => {
  //     const result = usersService.findOneByEmail({ email: 'a@a.com' });
  //     expect(result).toStrictEqual({
  //         email: "a@a.com",
  //         name: "짱구",
  //         ...
  //     })
  //   });

  describe('create', () => {
    it('이미 존재하는 이메일 검증하기!!', async () => {
      const myData = {
        email: 'a@a.com',
        password: '1234',
        name: '철수',
        age: 13,
      };

      try {
        await usersService.create({ ...myData });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        // expect(error).toBeInstanceOf(UnprocessableEntityException); // 잘 작동하는지 확인 용도
      }
    });

    it('회원 등록 잘 됐는지 검증!!', async () => {
      const myData = {
        email: 'bbb@bbb.com',
        password: '1234',
        name: '철수',
        age: 13,
      };

      const result = await usersService.create({ ...myData });
      const { password, ...rest } = result;
      expect(rest).toStrictEqual({
        email: 'bbb@bbb.com',
        name: '철수',
        age: 13,
      });
    });
  });
});
