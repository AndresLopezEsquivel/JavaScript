'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const loadMovements = account => {
  emptyMovementsContainer();
  const movements = account.movements;
  movements.forEach((movement, index) => {
    const movementType = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${movementType}">${
      index + 1
    } ${movementType}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${movement}</div>
    </div>`;
    // https://developer.mozilla.org/es/docs/Web/API/Element/insertAdjacentHTML
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const loadSumIn = account => {
  const sumIn = account.movements
    .filter(movement => movement > 0)
    .reduce((currSumIn, movement) => currSumIn + movement);
  labelSumIn.textContent = `${sumIn} €`;
};

const loadSumOut = account => {
  const sumOut = account.movements
    .filter(movement => movement < 0)
    .reduce((currSumOut, movement) => currSumOut + movement);
  labelSumOut.textContent = `${Math.abs(sumOut)} €`;
};

const loadInterests = account => {
  const sumInterest = account.movements
    .filter(movement => movement > 0)
    .map(movement => movement * account.interestRate)
    .reduce((currSumOut, movement) => currSumOut + movement);
  labelSumInterest.textContent = `${sumInterest} €`;
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
  labelBalance.textContent = `${account.balance} €`;
};

const updateUI = account => {
  loadMovements(account);
  setTotalBalance(account);
  loadSumIn(account);
  loadSumOut(account);
  loadInterests(account);
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
  }
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

let currentAccount = null;

computeAllUsernames(accounts);
btnLogin.addEventListener('click', log_in);
btnTransfer.addEventListener('click', transferMoney);
