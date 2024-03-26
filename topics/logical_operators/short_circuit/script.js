function A() {
  console.log("Called A");
  return true;
}

function B() {
  console.log("Called B");
  return false;
}

// Short-circuit evaluation of an OR logical operator
// Check more at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR#short-circuit_evaluation

// When using the OR operator, the evaluation stops and returns the first
// encountered truthy value. If no value is truthy, then, the last value of the
// chain is returned.
console.log(null || undefined || 0 || 1 || true); // 1
console.log(null || undefined || 0); // 0 <- No value is truthy, so the last value is returned
// Here, A() returns true, hence B() is not called.
A() || B(); // Called A

// The OR operator can be used to assign a value to a variable if the variable is currently falsy
let val = null;
// Because val is null, it will be assigned 10
val ||= 10; // Same as val = val || 10
console.log(`val = ${val}`); // val = 10
val ||= 20; // val is 10, and because it is not falsy, it won't be assinged the value 20
console.log(`val = ${val}`); // val = 10

// Short-circuit evaluation of an AND logical operator
// Check more at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#short-circuit_evaluation

// When using the AND logical operator, the evaluation stops and returns the first
// encountered falsy value. If no value is falsy, then, the last value of the chain is returned.

console.log(1 && true && [] && 0 && 100); // 0
console.log(1 && true && [] && 100); // 100

// Here, B() return false, hence A() is not called
B() && A(); // Called B

// The AND operator can be used to assign a value to a variable if the variable is currently truthy
// val &&= X same as val = val && X
let person_name = "ANDREW";
person_name &&= "<HIDDEN-NAME>";
console.log(`person_name = ${person_name}`); // person_name = <HIDDEN-NAME>
