import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService], // AppController에 AppService 넣어줘
  // new AppController(AppService)라는 의미
})
export class AppModule {}
