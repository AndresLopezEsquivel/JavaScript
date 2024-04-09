'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'JPY',
  locale: 'ja-JP', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const emptyMovementsContainer = () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
  // The innerHTML methods returns the HTML that lives inside the element
  // So, here we are setting the inner HTML to be empty
  containerMovements.innerHTML = '';
};

const loadMovements = (account, sorted = false) => {
  emptyMovementsContainer();
  const movements = sorted
    ? account.movements.toSorted((a, b) => a - b)
    : account.movements;
  movements.forEach((movement, index) => {
    const movementType = movement > 0 ? 'deposit' : 'withdrawal';
    const movementWithCurrency = formatCurrency(
      movement,
      account.locale,
      account.currency
    );
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${movementType}">${
      index + 1
    } ${movementType}</div>
    <div class="movements__date">to do</div>
    <div class="movements__value">${movementWithCurrency}</div>
    </div>`;
    // https://developer.mozilla.org/es/docs/Web/API/Element/insertAdjacentHTML
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const formatCurrency = (amount, locale, currency) => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format
  const options = { style: 'currency', currency: currency };
  return new Intl.NumberFormat(locale, options).format(amount);
};

// const formatDate = date_string => {
//   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
//   const date = new Date(date_string);
//   const new_format =
//     `${date.getDate()}`.padStart(2, '0') +
//     `/` +
//     `${date.getMonth() + 1}`.padStart(2, '0') +
//     `/` +
//     `${date.getFullYear()}`;
//   return new_format;
// };

const loadSumIn = account => {
  const sumIn = account.movements
    .filter(movement => movement > 0)
    .reduce((currSumIn, movement) => currSumIn + movement);
  const sumInWithCurrency = formatCurrency(
    sumIn,
    account.locale,
    account.currency
  );
  labelSumIn.textContent = sumInWithCurrency;
};

const loadSumOut = account => {
  const sumOut = account.movements
    .filter(movement => movement < 0)
    .reduce((currSumOut, movement) => currSumOut + movement);
  const sumOutWithCurrency = formatCurrency(
    sumOut,
    account.locale,
    account.currency
  );
  labelSumOut.textContent = sumOutWithCurrency;
};

const loadInterests = account => {
  const sumInterest = account.movements
    .filter(movement => movement > 0)
    .map(movement => movement * account.interestRate)
    .reduce((currSumOut, movement) => currSumOut + movement);
  const interestWithCurrency = formatCurrency(
    sumInterest,
    account.locale,
    account.currency
  );
  labelSumInterest.textContent = interestWithCurrency;
};

const computeUsername = account => {
  // e.g. "Andrés López" should be "al"
  return account.owner
    .toLowerCase()
    .split(' ')
    .map(word => word[0])
    .join('');
};

const computeAllUsernames = accounts => {
  accounts.forEach(account => {
    account.username = computeUsername(account);
  });
};

const calcTotalBalance = account => {
  return account.movements.reduce(
    (curr_balance, movement) => curr_balance + movement
  );
};

const setTotalBalance = account => {
  account.balance = calcTotalBalance(account);
  const balanceWithCurrency = formatCurrency(
    account.balance,
    account.locale,
    account.currency
  );
  labelBalance.textContent = balanceWithCurrency;
};

const updateUI = account => {
  loadMovements(account);
  setTotalBalance(account);
  loadSumIn(account);
  loadSumOut(account);
  loadInterests(account);
  // generateArrayFromMovementsUI();
};

const log_in = e => {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(account => {
    return (
      account.username === inputLoginUsername.value &&
      account.pin === Number(inputLoginPin.value)
    );
  });

  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginUsername.blur(); // Remove cursor from the username field
  inputLoginPin.blur(); // Remove cursor from the password field

  if (currentAccount) {
    containerApp.style.opacity = 100;
    updateUI(currentAccount);
    setCurrentDateTime();
  }
};

const setCurrentDateTime = () => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  const now = new Date();
  // const date =
  //   `${now.getDate()}`.padStart(2, '0') +
  //   `/` +
  //   `${now.getMonth() + 1}`.padStart(2, '0') +
  //   `/` +
  //   `${now.getFullYear()}, ` +
  //   `${now.getHours()}:` +
  //   `${now.getMinutes()}`;

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  };
  // For locales: http://www.lingoes.net/en/translator/langcode.htm
  const date = new Intl.DateTimeFormat(currentAccount.locale, options).format(
    now
  );
  labelDate.textContent = date;
};

const transferMoney = e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const userToTransferTo = accounts.find(
    account => account.username === inputTransferTo.value
  );
  console.log(`userToTransferTo: ${userToTransferTo?.username}`);
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();

  if (
    amount > 0 &&
    userToTransferTo &&
    userToTransferTo?.username !== currentAccount.username &&
    amount <= currentAccount.balance
  ) {
    currentAccount.movements.push(-1 * amount);
    userToTransferTo.movements.push(amount);
    updateUI(currentAccount);
  }
};

const deleteAccount = e => {
  e.preventDefault();
  const username = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);
  inputCloseUsername.value = inputClosePin.value = '';
  inputCloseUsername.blur();
  inputClosePin.blur();
  if (username === currentAccount.username && pin === currentAccount.pin) {
    const userIndex = accounts.findIndex(
      account => account.username === username
    );
    // const userIndex = accounts.indexOf(currentAccount); // <= This also works
    accounts.splice(userIndex, 1);
    containerApp.style.opacity = 0;
  }
};

const sortMovements = () => {
  sorted = !sorted;
  loadMovements(currentAccount, sorted);
};

// I created the generateArrayFromMovementsUI just to show how the
// static method Array.from works
// const generateArrayFromMovementsUI = () => {
//   const movs = Array.from(
//     document.querySelectorAll('.movements__value'),
//     node => {
//       return Number(node.textContent.replace('€', ''));
//     }
//   );
//   console.log(movs);
// };

let currentAccount = null;
let sorted = false;

computeAllUsernames(accounts);
btnLogin.addEventListener('click', log_in);
btnTransfer.addEventListener('click', transferMoney);
btnClose.addEventListener('click', deleteAccount);
btnSort.addEventListener('click', sortMovements);
