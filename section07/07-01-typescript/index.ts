// 타입추론
let aaa = "안녕하세요"
// aaa = 3 //에러

// 타입명시
let bbb: string = "반갑습니다."
// bbb = 10 //에러

// 타입명시가 필요한 상황
let ccc: (number | string) = 1000
ccc = "1000원"

// 숫자타입
let ddd: number = 10
// ddd = "철수" //에러

// 불린타입
let eee: boolean = true
// ddd = "false" //에러

// 배열타입
let fff: number[] = [1,2,3,4,5]
let ggg: string[] = ["안녕", "히세요"]
let hhh: (string | number)[] = ["안녕",1]

// 객체타입
interface IProfile {
    name: string
    age: number | string
    school: string
    hobby?: string
}
const profile: IProfile = {
    name: "철수",
    age: 8,
    school: "다람쥐초등학교"
}

// 함수타입
// 함수는 타입 추론이 되지 않음 -> 무조건 명시
function add(num1:number, num2:number, unit: string): string {
    console.log("num1", num1)
    console.log("num2", num2)
    console.log("unit", unit)
    return num1+num2+unit
}
const result = add(1000, 2000, "원") // 결과의 리턴 타입 예측 가능
console.log("result", result)

const add2 = (num1:number, num2:number, unit: string): string => {
    console.log("num1", num1)
    console.log("num2", num2)
    console.log("unit", unit)
    return num1+num2+unit
}
const result2 = add2(1000, 2000, "원")
console.log("result2", result2)