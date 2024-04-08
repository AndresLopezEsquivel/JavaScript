"use strict";

// The find method let us retrieve the first element of an array that meets
// a certain condition.
const employees = [
  { id: 1, name: "Andrés" },
  { id: 2, name: "Isabel" },
];

const employee = employees.find((employee) => employee.id === 2);
console.log(employee); // {id: 2, name: 'Isabel'}
