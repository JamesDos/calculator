let zeroButton = document.querySelector('#zero');
let oneButton = document.querySelector('#one');
let twoButton = document.querySelector('#two');
let threeButton = document.querySelector('#three');
let fourButton = document.querySelector('#four');
let fiveButton = document.querySelector('#five');
let sixButton = document.querySelector('#six');
let sevenButton = document.querySelector('#seven');
let eightButton = document.querySelector('#eight');
let nineButton = document.querySelector('#nine');
let decimalButton = document.querySelector('#decimal');
let addButton = document.querySelector('#add');
let subtractButton = document.querySelector('#subtract');
let multiplyButton = document.querySelector('#multiply');
let divideButton = document.querySelector('#divide');
let clearButton = document.querySelector('#clear-button');
let deleteButton = document.querySelector('#delete-button');
let calculatorScreen = document.querySelector('.calculator-screen');
let bigNum = document.querySelector('#screen-big-num');
let smallNum = document.querySelector('#screen-small-num');

let numButtons = [zeroButton, oneButton, twoButton, threeButton, fourButton, fiveButton, sixButton, sevenButton, eightButton, nineButton];
let operatorButtons = [decimalButton, addButton, subtractButton, multiplyButton, divideButton];

let currNum = 0;
let num1;
let num2;
let operator;

let setOperator = op => operator = op;

addButton.addEventListener('click', () => setOperator("+"));
subtractButton.addEventListener('click', () => setOperator("-"));
multiplyButton.addEventListener('click', () => setOperator("*"));
divideButton.addEventListener('click', () => setOperator("/"));

let deleteNum = () => {
  currNum = Math.floor(currNum / 10);
  bigNum.textContent = String(currNum);
  console.log(currNum);
}

deleteButton.addEventListener('click', deleteNum);

let clearScreen = () => {
  currNum = 0;
  smallNum.innerHTML = '';
  bigNum.textContent = currNum;
}

clearButton.addEventListener('click', clearScreen);

let appendNum = n => {
  if (currNum === 0) {
    currNum = n;
  } else {
    currNum = (10 * currNum) + n;
  }
  bigNum.textContent = String(currNum);
  console.log(currNum);
}

for(let i = 0; i < numButtons.length; i++) {
  numButtons[i].addEventListener('click', () => appendNum(i));
}

let add = (num1, num2) => {
  return num1 + num2;
}

let subtract = (num1, num2) => {
  return num1 - num2;
}

let multiply = (num1, num2) => {
  return num1 * num2;
}

let divide = (num1, num2) => {
  if (num2 !== 0) {
    return num1 / num2;
  } alert ("Cannot Divide By Zero!");
}

let operate = (num1, operator, num2) => {
  if (operator === "+") {
    return add(num1, num2);
  } if (operator === "-") {
    return subtract(num1, num2);
  } if (operator === "*") {
    return multiply(num1, num2);
  } if (operater === "/" && num2 !== 0) {
    return divide(num1, num2);
  } // add decimal operator
}



