const any_obj = {
  key_1: "val_1",
  key_2: "val_2",
  key_3: "val_3",
  key_4: "val_4",
};

// To loop through keys
console.log("Keys:");
for (const key of Object.keys(any_obj)) console.log(key);

// To loop through values
console.log("Values:");
for (const value of Object.values(any_obj)) console.log(value);

// To loop through both keys and values
console.log("Both keys and values:");
for (const [key, value] of Object.entries(any_obj))
  console.log(`${key} => ${value}`);
