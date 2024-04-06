// To process all the elements of an array a produce one single value,
// use the reduce method
const numbers = [1, 2, 3, 4, 5];

// acc: accumulator (current value of the one single value to be calculated)
// num: number (current item of the array)
// idx: index of the current item
// arr: array that is being iterating
// The reduce method also receives an initial value
const sum = numbers.reduce((acc, num, idx, arr) => acc + num, 0);

console.log(numbers); // [1, 2, 3, 4, 5]
console.log(sum); // 15
