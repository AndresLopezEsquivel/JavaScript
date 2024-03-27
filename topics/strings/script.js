// Uppercasing and downcasing
console.log("Uppercasing and downcasing");
console.log("Andrés".toUpperCase()); // ANDRÉS
console.log("Andrés".toLowerCase()); // andrés

// Indexing works with strings
const word = "esquivel";
console.log("Indexing strings: ");
console.log(word[0]); // e
console.log(word[1]); // s

// Get the index of the first occurrence
console.log("Index of the first occurrence: ");
console.log(word.indexOf("e")); // 0

// Get the index of the last occurrence
console.log("Index of the last ocurrence: ");
console.log(word.lastIndexOf("e")); // 6

// Getting the index at which a word starts
const fullName = "Andrés López Esquivel";
console.log("Getting the index at which a word starts: ");
console.log(fullName.indexOf("López")); // 7
console.log(fullName.indexOf("lópez")); // -1 <- It wasn't found

// Slicing a string
// str.slice(<start>, <end>) <= <start> is included, <end> not
console.log("Slicing a string: ");
// Getting the last names
console.log(fullName.slice(fullName.indexOf("López"))); // López Esquivel
// Negative indexes are allowed
console.log(fullName.slice(-8)); // Esquivel

// Replacing elements in a string
// The replace function only replaces the first ocurrence
const amount = "12,86 €";
console.log("Replacing elements in a string: ");
console.log(`$ ${amount.replace("€", "").replace(",", ".")}`); // $ 12.86
// To replace all elements use the replaceAll function
console.log("$ - $".replaceAll("$", "#")); // # - #
// Or we can use a regular expression
console.log("$ - $".replace(/\$/g, "#")); // # - #

// Checking inclusion
console.log("Checking inclusion: ");
console.log("Andrés López".includes("Andrés")); // true

// Checking if a string starts with another string
console.log("Checking if a string starts with another string: ");
console.log("Andrés".startsWith("And")); // true

// Checking if a string ends with another string
console.log("Checking if a string ends with another string: ");
console.log("Andrés".endsWith("és")); // true

// Splitting strings
console.log("Splitting strings: ");
console.log("Andrés,López,Esquivel".split(",")); // ['Andrés', 'López', 'Esquivel']

// Joining elements of an array into a string
console.log("Joining elements of an array into a string: ");
console.log(["W", "H", "A", "T"].join(" ")); // W H A T

// Padding
console.log("Padding: ");
console.log("padStart".padStart(3, "-"));
console.log("padEnd".padEnd(3, "-"));
