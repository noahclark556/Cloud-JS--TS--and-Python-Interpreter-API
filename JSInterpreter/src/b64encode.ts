// For development


function base64Encode(code:string) {
    return btoa(code); // Base64 encode
  }
  
  const test1 = `
  const sum = 1 + 2;
  sum;
  `;
  const test2 = `
  console.log("Hello, World!");
  `;
  const test3 = `
  function test() {
  for (let i = 0; i < 5; i++) {
    console.log("Iteration: " + i);
  }
  return "Loop Complete";
}
test();
  `;
  const test4 = `
  function checkNumber(num) {
  if (num > 0) {
    return "Positive";
  } else if (num < 0) {
    return "Negative";
  } else {
    return "Zero";
  }
}
checkNumber(10);
  `;
  const test5 = `
  function testErrorHandling() {
  try {
    console.log("Before error");
    // This will throw a ReferenceError
    notDefinedFunction();
  } catch (error) {
    console.log("Caught error:", error.message);
    return "Error handled";
  }
}
testErrorHandling();
  `;

  const test6 = `
  function factorial(n) {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}
factorial(5);
  `;

  const test7 = `
 (async () => {
            function asyncTest() {
              return new Promise((resolve) => {
                setTimeout(() => {
                  console.log("Async operation complete");
                  resolve("Async result");
                }, 1000);
              });
            }
            return asyncTest(); // Return the promise
          })();
  `;

  const test8 = `
  const person = {
  firstName: "John",
  lastName: "Doe",
  getFullName() {
    return this.firstName + " " + this.lastName;
  }
};
person.getFullName();
  `;

  const test9 = `
  function createMultiplier(multiplier) {
  return function(num) {
    return num * multiplier;
  };
}
const double = createMultiplier(2);
double(5);
  `;

  const test10 = `
function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

for (var i = 0; i < 20; i++) {
    console.log("hello " + i.toString());
    if (i % 5 == 0) {
        console.log(add(i, i + 1));
    }
    if (i % 2 == 0) {
        console.log(sub(i, i + 1));
    }
}
  `;

  //bad
  const test11 = `
  function add(a, b) {
      return a + b;
  }
  
  function sub(a, b) {
      return a @ b;
  }
  
  for (var i = 0; i ; 20; i++) {
      console.log("hello " + i.toString());
      if (i % 5 == 0) {
          console.log(add(i, i + 1));
      }
      if (i % 2 == 0) {
          console.log(sub(i, i + 1));
      }
  }
    `;

const test12 = `
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(2, 3));

`;

    const test13 = `
  interface Person {
  firstName: string;
  lastName: string;
  age: number;
}

const person: Person = {
  firstName: "Jane",
  lastName: "Doe",
  age: 30
};

console.log(person.firstName + " " + person.lastName);
    `;

    const test14 = `
    function fetchData(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data fetched!");
    }, 1000);
  });
}

async function getData() {
  const result = await fetchData();
  console.log(result);
}

getData();

    `;

    const test15 = `
    class Animal {
  constructor(public name: string) {}
  
  speak(): string {
    return \`\${this.name} makes a noise.\`;
  }
}

class Dog extends Animal {
  speak(): string {
    return \`\${this.name} barks.\`;
  }
}

const dog = new Dog("Rex");
console.log(dog.speak());
    `;

  let f:Array<string> = [test1, test2, test3, test4,test5,test6,test7,test8,test9, test10, test11, test12, test13, test14, test15];
  let index = 1;
f.forEach(a => {
    let encodedCode = base64Encode(a);
    console.log(`Test ${index}`);
    if(index >= 12){
    console.log(`curl -X POST http://localhost:3001/jsinterpreter -H "Content-Type: application/json" -d '{"code": "${encodedCode}", "isTypeScript":true}'`);
    }else{
      console.log(`curl -X POST http://localhost:3001/jsinterpreter -H "Content-Type: application/json" -d '{"code": "${encodedCode}"}'`);
    }
    console.log(`______________________`);
    index += 1;
});