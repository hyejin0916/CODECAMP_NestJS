interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// 1. Partial 타입: 모든 속성을 선택사항으로 변경
type aaa = Partial<IProfile>;

// 2. Required 타입: 모든 속성을 필수사항으로 변경
type bbb = Required<IProfile>;

// 3. Pick 타입: 필요한 속성만
type ccc = Pick<IProfile, "name" | "age">;

// 4. Omit 타입: 선택한 속성만 제외
type ddd = Omit<IProfile, "school">;

// 5. Recode 타입
type eee = "철수" | "영희" | "훈이"; // Union 타입
let child1: eee = "영희"; // 철수, 영희, 훈이 중에만 선택가능

type fff = Record<eee, number>; // 각각의 레코드에 타입을 지정함
type fff2 = Record<eee, IProfile>;

// 6. 객체의 key들로 Union 타입 만들기
type ggg = keyof IProfile; // "name" | "age" | "school" | "hobby"
let myprofile: ggg = "hobby";

// 7. type vs interface 차이
// interface: 같은 이름의 타입을 만들면 합쳐짐(선언병합 가능)
// type: 선언병합 불가능
interface IProfile {
  candy: number; // 선언 병합으로 추가됨
} // "name" | "age" | "school" | "hobby?" | "candy"

let profile: Partial<IProfile> = {
  //  Partial을 이용해 모든 속성을 선택사항으로 변경
  candy: 10,
};
