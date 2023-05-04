// // public, private, protected, readonly

// class Monster {
//     // power        => public, private, protected, readonly중 1개라도 있으면 생략가능
//     constructor(protected power) {
//         // this.power = power       => public, private, protected, readonly중 1개라도 있으면 생략가능
//     }

//     attack1 = () => {
//         console.log("공격!")
//         console.log("공격력은 "+ this.power) // 안에서 접근 가능
//         mymonster1.power = 10 // 안에서 수정 가능
//     }
// }

// class Monster2 extends Monster {
//     attack2 = () => {
//         console.log("공격2!")
//         console.log("공격력2은 "+ this.power) //  자식이 접근 가능
//         mymonster1.power = 10 // 자식이 수정 가능
//     }
// }

// const mymonster1 = new Monster2(20)
// mymonster1.attack1()
// mymonster1.attack2()
// console.log(mymonster1.power) // 밖에서 접근 불가능
// mymonster1.power = 10 // 밖에서 수정 불가능