import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appService: AppService;
  let appController: AppController;

  beforeEach(() => {
    // 모든 describe에서 실행해야하는 작업이기때문에 beforeEach를 사용하여 작업전에 초기화
    appService = new AppService();
    appController = new AppController(appService);
  });
  describe('getHello', () => {
    // const appService = new AppService();
    // const appController = new AppController(appService); // 의존성 주입

    it('이 테스트의 검증 결과는 Hello World!를 리턴해야함 !!!', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
  describe('fetchBoards', () => {
    // const appService = new AppService();
    // const appController = new AppController(appService);
  });
  describe('createBoard', () => {
    // const appService = new AppService();
    // const appController = new AppController(appService);
  });
});
