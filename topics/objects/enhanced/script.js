const high_school = {
  school_name: "CECyT 9 Juan de Dios Bátiz",
  institution: "IPN",
  location: "Popotla",
};

const personal = {
  first_name: "Andrés",
  last_name: "López",
  age: 23,
};

const person = {
  high_school, // There is no need to write high_school : high_school
  personal, // There is no need to write personal : personal
  // Now, the name of properties can be computed
  [`random_${Math.trunc(Math.random() * 10)}`]: Math.trunc(Math.random() * 10),
  // There is no longer need to create a property and
  // set it to a function in order to create a method
  say_hi() {
    return "Hi!";
  },
};

console.log(person);
