// REST property
// Check: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#rest_prop
// You can end a destructuring pattern with a rest property ...rest.
// This pattern will store all remaining properties of the object or array into a new object or array.

// An example using arrays
const numbers = [1, 2, 3, 4, 5];
// The ...rest element must be the last element
const [a, b, ...others] = numbers
console.log(a); // 1
console.log(b); // 2
console.log(others); // [3, 4, 5]

const person = {
  first_name : 'Andrés',
  college : 'UNAM',
  age : 23,
  city : 'CDMX'
};

// An example using objects
const {first_name, college, ...data} = person;
console.log(first_name); // Andrés
console.log(college); // UNAM
console.log(data); // {age: 23, city: 'CDMX'}

// This syntax can be used with function.
// The spread syntax was used to unpack the elements of an array
// and pass them to a function as arguments (the function receives
// a fixed number of arguments). On the other hand, the rest syntax can be used to
// to pack/compress any number of values into an array and pass it to a function.

const sum = (...numbers) => {
  let total = 0;
  for(let i = 0; i < numbers.length; i++) total += numbers[i];
  return total;
};

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5, 6)); // 21
// Let us use spread to send the arguments because YOLO
console.log(sum(...[1, 2, 3, 4, 5, 6, 7, 8, 9])); // 45

const any_f = (first_number, ...rest_of_numbers) => {
  console.log(first_number);
  console.log(rest_of_numbers);
};

any_f(...[1, 2, 3]);
// 1
// [2, 3]
