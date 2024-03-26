// Destructuring is a way of unpacking values
// from an array or object into separate variables

const numbers = [1, 2, [3, 4]];
// Here, the second element of the numbers array is being ignored.
// As you can see, a nested destructuring is being implemented
// because the third element of the numbers array is an array
const [a, , [b, c]] = numbers;

console.log(`numbers = ${numbers}`); // numbers = 1,2,3,4
console.log(`a, b, c = ${a}, ${b}, ${c}`); // a, b, c = 1, 3, 4

// Destructuring can also be used to swap values
let val_1 = 100
let val_2 = 200

console.log(`Before swaping: val_1, val_2 = ${val_1}, ${val_2}`);
// Before swaping: val_1, val_2 = 100, 200
[val_1, val_2] = [val_2, val_1]
console.log(`After swaping: val_1, val_2 = ${val_1}, ${val_2}`);
// After swaping: val_1, val_2 = 200, 100

// There might be cases where the number of elements received
// is unknown. In those situation, default values can be set.
const unknown_arr = [1, 2, 3]
// Here, we are trying to destruct five elements when we are
// receiving only three, but there won't be any problem because
// we have set default values
const [n1 = 10, n2 = 20, n3 = 30, n4 = 40, n5 = 50] = unknown_arr
console.log(`n1, n2, n3, n4, n5 = ${n1}, ${n2}, ${n3}, ${n4}, ${n5}`);
// n1, n2, n3, n4, n5 = 1, 2, 3, 40, 50
