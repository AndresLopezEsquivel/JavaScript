const group_1 = ['Andrés', 'Alejandro', 'Isabel'];
const group_2 = ['Marco', 'Alicia', 'Elizabeth'];
const people = [...group_1, ...group_2];

for (const person of people) console.log(`name = ${person}`);

// name = Andrés
// name = Alejandro
// name = Isabel
// name = Marco
// name = Alicia
// name = Elizabeth

for (const [i, person] of people.entries()) console.log(`${i + 1} ) ${person}`);

// 1 ) Andrés
// 2 ) Alejandro
// 3 ) Isabel
// 4 ) Marco
// 5 ) Alicia
// 6 ) Elizabeth
