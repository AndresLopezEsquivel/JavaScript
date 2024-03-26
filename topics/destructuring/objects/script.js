// Destructuring not only can be applied to arrays but also to objects
// To know more about destructuring assigment, check:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

// General syntax for destructuring an object
// const { a, b } = obj;
// const { a: a1, b: b1 } = obj;
// const { a: a1 = aDefault, b = bDefault } = obj;
// const { a, b, ...rest } = obj;
// const { a: a1, b: b1, ...rest } = obj;
// const { [key]: a } = obj;

// Let's consider the algorithms_book object
const algorithms_book = {
  title: 'Algorithms',
  author: ['Robert Sedgewick', 'Kevin Wayne'],
  publisher: 'Addison-Wesley Professional',
  publicationDate: '2011-03-24',
  edition: 4,
  keywords: ['computer science','programming', 'algorithms', 'data structures', 'java', 'math', 'software', 'engineering'],
  pages: 976,
  format: 'hardcover',
  ISBN: '9780321573513',
  language: 'English',
  programmingLanguage: 'Java',
  onlineContent: true,
  thirdParty: {
    goodreads: {
      rating: 4.41,
      ratingsCount: 1733,
      reviewsCount: 63,
      fiveStarRatingCount: 976,
      oneStarRatingCount: 13
    }
  },
  highlighted: true
}

// To destructure an object, it is required to use the original
// names of its attributes.
const {title, author, publisher} = algorithms_book;

console.log(`title, author, publisher = ${title}, ${author}, ${publisher}`);
// title, author, publisher = Algorithms, Robert Sedgewick,Kevin Wayne, Addison-Wesley Professional

// However, if you'd like to name differently the destructured elements,
// do the next
const {title: book_name, publisher: pub} = algorithms_book;

console.log(`title, publisher = ${book_name}, ${pub}`);
// title, publisher = Algorithms, Addison-Wesley Professional

// It is also possible to indicate default values
const {ISBN = "no isbn", languages = "no languages"} = algorithms_book;
console.log(`ISBN, languages = ${ISBN}, ${languages}`)
// ISBN, languages = 9780321573513, no languages

// You can send arguments to a function using by destructuring an object
const print_details = ({name, age, city}) => {
  console.log(`Name: ${name}`);
  console.log(`Age: ${age}`);
  console.log(`City: ${city}`);
}

print_details({
  name: "Andrés",
  age: 23,
  city: "CDMX"
})

// Name: Andrés
// Age: 23
// City: CDMX
