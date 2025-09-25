const factorial = N => {
  let counter = 0;
  let r = 1;
  let i = 0;
  while(N - i > 1)
  {
    counter++;
    console.log(`N - i = ${N} - ${i}`);
    r *= N - i;
    i += 1;
  }
  console.log(`counter: ${counter}`);
  return r;
};

console.log(`factorial(3) = ${factorial(3)}`);
