// Unlike the call and apply functions, the bind function doesn't immediately
// call the function it is being used with.

const pointA = {
  x: 3,
  y: 2,
  operations: [],
};

const pointB = {
  x: 5,
  y: 8,
  operations: [],
};

const sum = function () {
  const sumResult = this.x + this.y;
  this.operations.push({ operation: "sum", result: sumResult });
};

const sumPointA = sum.bind(pointA);
const sumPointB = sum.bind(pointB);

sumPointA();
sumPointB();

console.log(pointA); // {x: 3, y: 2, operations: [{operation: "sum", result: 5}]}
console.log(pointB); // {x: 5, y: 8, operations: [{operation: "sum", result: 13}]}

// The bind method lets us do something called partial application
// When calling the bind function, partial application lets us indicate just a
// certain number of arguments. The rest of arguments are passed to the function
// returned by the bind function.

const roboCupSoccer = {
  humanoid: [],
  middleSize: [],
  smallSize: [],
};

const registerRobot = function (soccerCategory, robotName) {
  this[soccerCategory].push(robotName);
};

// registerRobot receives two arguments. We will use partial application
// to previously send the argument corresponding to the soccerCategory parameter,
// so the programmer only passes the name of the robot.

const registerRobotToHumanoid = registerRobot.bind(roboCupSoccer, "humanoid");
const registerRobotToMiddleSize = registerRobot.bind(
  roboCupSoccer,
  "middleSize"
);

registerRobotToHumanoid("humanoid1");
registerRobotToHumanoid("humanoid2");

registerRobotToMiddleSize("MiddleSize1");
registerRobotToMiddleSize("MiddleSize2");

console.log(roboCupSoccer); // {humanoid: Array(2), middleSize: Array(2), smallSize: Array(0)}
console.log(roboCupSoccer.humanoid); // ['humanoid1', 'humanoid2']
console.log(roboCupSoccer.middleSize); // ['MiddleSize1', 'MiddleSize2']

// Partial application not only can be used to mutate objects but also to
// previously set arguments to normal functions

const tax = (tax, amount) => amount * (1 + tax);
const tax30 = tax.bind(null, 0.3); // Because we are no mutating any object, we send null

console.log(tax30(100)); // 130

// Although we can do the last with by using a closure
const taxV2 = (tax) => (amount) => amount * (1 + tax);
const tax30V2 = taxV2(0.3);

console.log(tax30V2(100)); // 130

// Lets see an example using addEventListener
const pageObject = {
  numClicks: 0,
  incrementNumClicks() {
    this.numClicks++;
    console.log(`numClicks: ${this.numClicks}`);
  },
};

document
  .querySelector("button")
  .addEventListener("click", pageObject.incrementNumClicks.bind(pageObject));

// If we do not use bind to indicate where the 'this' keyword should point,
// when we press the button we get 'numClicks: NaN', because in that
// case 'this' points to the button and not to pageObject
// document
//   .querySelector("button")
//   .addEventListener("click", pageObject.incrementNumClicks);

// numClicks: 1
// numClicks: 2
// numClicks: 3
// numClicks: 4
