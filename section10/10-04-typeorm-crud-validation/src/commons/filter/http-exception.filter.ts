import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException) // HttpException관련 에러가 나면 해당 클래스 실행
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus();
    const message = exception.message;

    console.log('=============');
    console.log('에외 발생');
    console.log('예외 내용: ', message);
    console.log('예외 코드: ', status);
    console.log('=============');
  }
}

// implements: 타입을 만들어라고 강제해주는 것
