//Primitive data types

let isDone: boolean = false;

// unino types
function test(value: number | string): number {
  return value.length;
}

interface Person {
  name: string;
  age: number;
  color?: string;
  // 索引类型
  [propName: string ]: any;
  // [career: string]: string;
}

function t(config: Person): { id: number } {
  if (config.age) {
  }
  return { id: 1 };
}

let createT = t({
  name: "fyg",
  age: 27,
  kkk: 1,
});

let createT2 = t({
  name:"fyg",
  age:27,
  colour:"red",
} as Person)

let tom: Person = {
  name: "TOM",
  age: 26,
  career: "FED"
};

let tuple: [string, number, object];
tuple = ["1", 2, {}];

// coust cal:(x: number) => number =

interface ClockConstructor {
  new (hour: number, minute: number);
}

class Clock implements ClockConstructor {
  currentTime: Date;
  constructor(h: number, m: number) {}
}

interface ClassTest {
  name: string;
  sayName(s: string): void;
}

class newClassTest implements ClassTest {
  constructor() {}
  name: "fyg";
  sayName(s: string) {
    console.log(s);
  }
}


class Animal {
  name: string;
}
class Dog extends Animal {
  breed: string;
}


enum Colors {Red, Green, Yellow};
Colors.Green;

interface arrayMember {
  length: number;
}

function createArray<T extends arrayMember>(length: number, member: T):Array<T>{
  let array:Array<T> = [];
  
  console.log(member.length)
  
  for (let index = 0; index < length; index++) {
    array[index] = member;
  }
  return array;
}