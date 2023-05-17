// 한개 테스트
it('더하기 테스트', () => {
  const a = 1;
  const b = 2;

  expect(a + b).toBe(3);
});

// 그룹 테스트
describe('나의 테스트 그룹', () => {
  it('더하기 테스트', () => {
    const a = 1;
    const b = 2;

    expect(a + b).toBe(3);
  });

  it('곱하기 테스트', () => {
    const a = 1;
    const b = 2;

    expect(a * b).toBe(2);
  });
});

// 상품 구매하기 테스트 예제
describe('상품 구매 테스트', () => {
  //   beforeAll(() => {}); // 모든 it 실행 하기 전에 딱 1번 실행(로그인 등)
  //   beforeEach(() => {}); // 각각의 it들 실행하기 전에 매번 실행(초기값, 초기화 등)

  it('돈검증하기', () => {
    const result = true; // 돈이 충분하다고 가정
    expect(result).toBe(true);
  });
  it('상품구매하기', () => {
    const result = true; // 상품을 구매했다고 가정
    expect(result).toBe(true);
  });
});
