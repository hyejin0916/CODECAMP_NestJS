import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([
//       User, //
//     ]),
//   ],
//   providers: [
//     AuthResolver, //
//     AuthService,
//     UsersService,
//   ],
// })
// imports와 providers에서 user와 관련된 정보를 따로 가져오지말고
// 간단하게 user의 모듈만 가져오기

@Module({
  imports: [
    JwtModule.register({}), // JWT주입
    UsersModule, //
  ],
  providers: [
    AuthResolver, //
    AuthService,
  ],
})
export class AuthModule {}
