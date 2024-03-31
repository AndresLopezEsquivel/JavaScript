// A set is a collection of unique values
// The order of the elements of a set is irrelevant
const foods = ["Pizza", "Tacos", "Beef", "Pizza", "Burrito", "Burrito"];
const nonDuplicateFoods = new Set(foods);
console.log(nonDuplicateFoods); // Set(4) {'Pizza', 'Tacos', 'Beef', 'Burrito'}
// A string is also a iterable
console.log(new Set("esquivel"));
// Get the size of a set
console.log(nonDuplicateFoods.size); // 4
// Check the existence of an element
console.log(nonDuplicateFoods.has("Pizza")); // true
console.log(nonDuplicateFoods.has("Bread")); // false

const values = new Set([1, 1, 2, 2, 3, 4]);
values.add(1);
values.add(5);
values.add(5);
console.log(values); // Set(5) {1, 2, 3, 4, 5}
values.delete(4);
console.log(values); // Set(4) {1, 2, 3, 5}

for (const value of values) console.log(value);

// Create an array from a set using the spread syntax
const uniqueValues = [...values];
console.log(uniqueValues); // [1, 2, 3, 5]
