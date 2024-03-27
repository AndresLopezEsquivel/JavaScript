// Maps are similar to objects, however, they are different since
// their keys can be of any type
const data = new Map();

data.set("name", "Andrés");
data.set("age", 23);
data.set(1, "One");
data.set(true, "TrueValue");
const arr = [1, 2, 3];
data.set(arr, "Array of numbers");

console.log(data); // Map(5) {'name' => 'Andrés', 'age' => 23, 1 => 'One', true => 'TrueValue', Array(3) => 'Array of numbers'}
console.log(data.get("name")); // Andrés
console.log(data.get(true)); // TrueValue
console.log(data.get(arr)); // Array of numbers
// Although [1, 2, 3] and arr have the same structure, they are not the same object
console.log(data.get([1, 2, 3])); // undefined

console.log(data.has("name")); // true
console.log(data.has(arr)); // true
console.log(data.has([1, 2, 3])); // false

data.delete("age");
data.delete(true);
console.log(data); // Map(3) {'name' => 'Andrés', 1 => 'One', Array(3) => 'Array of numbers'}

console.log(data.size); // 3

// Another way of creating a Map is by providing it an array of arrays
// where the first element of each array is the key and the second the value
const personMap = new Map([
  ["name", "Andrés"],
  ["age", 23],
  ["college", "UNAM"],
]);

console.log("personMap: ");
console.log(personMap); // Map(3) {'name' => 'Andrés', 'age' => 23, 'college' => 'UNAM'}

// If we can initialize a Map using an array of arrays, then, we
// can also initialize with Object.entries
const personObject = {
  name: "Andrés",
  age: 23,
  college: "unam",
};

const personMapFromObject = new Map(Object.entries(personObject));

console.log("personMapFromObject: ");
console.log(personMapFromObject); // Map(3) {'name' => 'Andrés', 'age' => 23, 'college' => 'unam'}

// Iterating over a map implies less code than iterating over an object.
// Remember, Object.entries is needed to iterate over both keys and values of an object.

for (const [key, value] of personMap)
  console.log(`key: ${key}, value: ${value}`);

// key: name, value: Andrés
// key: age, value: 23
// key: college, value: UNAM

// Generate an array from a map using the spread operator
console.log("Map to array: ");
console.log([...personMap]);
// [['name', 'Andrés'],
// ['age', 23],
// ['college', 'UNAM']]
console.log("Array of keys: ");
console.log([...personMap.keys()]); // ['name', 'age', 'college']
console.log("Array of values: ");
console.log([...personMap.values()]); // ['Andrés', 23, 'UNAM']
