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
    name:'TOM',
    age:26
}


