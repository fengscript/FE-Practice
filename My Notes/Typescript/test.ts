//Primitive data types

let isDone: boolean = false;

// unino types
function test(value: number | string): number {
  return value.length;
}

interface Person {
  name: string;
  age: number;
  [name: string]: string;
}

let tom: Person = {
  name: "TOM",
  age: 26
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

class newClassTest implements ClassTest{
  constructor(){};
  name:"fyg";
  sayName(s:string ){
    console.log(s)
  }
}
