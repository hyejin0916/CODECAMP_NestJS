// 1. 문자/숫자/불린 기본타입
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};

const result = getPrimitive("철수", 123, true);

//
//
// 2. any 타입(자바스크립트와 같음)
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  console.log(arg1 + 100); // any는 아무거나 다 됨
  return [arg3, arg2, arg1];
};

const result2 = getAny("철수", 123, true);

//
//
// 3. unknown 타입: 아직 알려지지 않았다
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  if (typeof arg1 === "number") console.log(arg1 + 100); // any는 아무거나 다 됨
  return [arg3, arg2, arg1];
};

const result3 = getUnknown("철수", 123, true);

//
//
// 4. generic 타입: 들어가면 그 타입이 확정된다(any와 차이점)
function getGeneric<MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] {
  return [arg3, arg2, arg1];
}

const result4 = getGeneric<string, number, boolean>("철수", 123, true);

//
//
// 5. generic 타입 - 2
function getGeneric2<T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {
  return [arg3, arg2, arg1];
}

const result5 = getGeneric2("철수", 123, true);

//
//
// 6. generic 타입 - 3
const getGeneric3 = <T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] => {
  return [arg3, arg2, arg1];
};

const result6 = getGeneric3("철수", 123, true);
