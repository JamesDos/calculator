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
let equalsButton = document.querySelector('#equals');
let clearButton = document.querySelector('#clear-button');
let deleteButton = document.querySelector('#delete-button');
let calculatorScreen = document.querySelector('.calculator-screen');
let bigNum = document.querySelector('#screen-big-num');
let smallNum = document.querySelector('#screen-small-num');

let numButtons = [zeroButton, oneButton, twoButton, threeButton, fourButton, fiveButton, sixButton, sevenButton, eightButton, nineButton];
let operatorButtons = [decimalButton, addButton, subtractButton, multiplyButton, divideButton];
let nums = ["num1", "num2"];

let screenNum = 0;
let currNum = nums[0];
let num1;
let num2;
let prevOp;
let currOp;
let currButton = zeroButton;
let prevButton = zeroButton;

let setCurrOperator = op => {
  if (op !== '=' || currOp !== '=') {
    prevOp = currOp;
    currOp = op;
  }
};

let updateCurrButton = newButton => {
  if (newButton.id !== 'equals' || currButton.id !== ('equals')) {
    prevButton = currButton;
    currButton = newButton;
  }
};

// updates num1, num2, screenNum, and currNum
let updateNums = () => {
  console.log(`currButton: ${currButton.id}`);
  console.log(`prevButton: ${prevButton.id}`);
  if (currButton.classList.contains('op-button') && prevButton.classList.contains('num-button')) {
    if (currNum === nums[0]) {
      if (currButton.id !== "equals") {
        num1 = screenNum;
        displayNumBig(num1);
        currNum = nums[1];
        displayNumSmall(num1, num2);
      }
    } else {
      if (currOp !== "=") {
        num2 = screenNum;
        // console.log(`while operating: ${num1}, ${num2}`);
        num1 = operate(num1, prevOp, num2);
        screenNum = num1;
        displayNumBig(num1);
        displayNumSmall(num1, num2);
      } else {
        let oldNum1 = num1;
        num2 = screenNum;
        console.log(`while operating: ${num1}, ${num2}`);
        num1 = operate(num1, prevOp, num2);
        screenNum = num1;
        displayNumBig(num1);
        displayNumSmall(oldNum1, num2);
        // causes screen to clear if division by zero (operate clears screen)
        num1 = operate(oldNum1, prevOp, num2);
      }
    }
  }
  if (currButton.classList.contains('num-button') && prevButton.classList.contains(`op-button`)) {
      // reset screenNum and num2
      screenNum = 0;
      num2 = 0;
  } if (currButton.classList.contains('op-button') && !(prevButton.classList.contains('num-button')) ) {
      displayNumSmall(num1, num2);
  }
  console.log(`num1: ${num1}, num2: ${num2}, currNum: ${currNum}, screenNum: ${screenNum}, prevOp: ${prevOp}, currOp: ${currOp}`);
};

addButton.addEventListener('click', () => {
  setCurrOperator("+");
  updateCurrButton(addButton);
  updateNums();
});
subtractButton.addEventListener('click', () => {
  setCurrOperator("-");
  updateCurrButton(subtractButton);
  updateNums();
});
multiplyButton.addEventListener('click', () => {
  setCurrOperator("*");
  updateCurrButton(multiplyButton);
  updateNums()
});
divideButton.addEventListener('click', () => {
  setCurrOperator("/");
  updateCurrButton(divideButton);
  updateNums();
});
equalsButton.addEventListener('click', () => {
  setCurrOperator("=");
  updateCurrButton(equalsButton);
  updateNums();
});

let displayNumBig = num => {
  if (num !== undefined) {
    bigNum.textContent = String(num);
  } 
}

let displayNumSmall = (num1, num2) => {
  if (currNum === nums[1]) {
    if(currOp !== "=") {
      console.log('in if');
      smallNum.textContent = `${num1} ${currOp}`;
    } else {
      smallNum.textContent = `${num1} ${prevOp} ${num2} ${currOp}`;
    }
  }
}

let deleteNum = () => {
  if (screenNum >= 0) {
    screenNum = Math.floor(screenNum / 10);
  } else {
    screenNum = Math.ceil(screenNum / 10);
  }
  displayNumBig(screenNum);
  console.log(screenNum);
}

deleteButton.addEventListener('click', deleteNum);

let clearScreen = () => {
  num1 = 0;
  num2 = 0;
  currNum = nums[0];
  screenNum = num1;
  smallNum.innerHTML = '';
  bigNum.textContent = screenNum;
}

clearButton.addEventListener('click', clearScreen);

let appendNum = n => {
  if (screenNum === 0) {
    screenNum = n;
  } else if (screenNum >= 0) {
    screenNum = (10 * screenNum) + n;
  } else {
    screenNum = (10 * screenNum) - n;
  }
  if (currNum === nums[0]) {
    num1 = screenNum;
  } else {
    num2 = screenNum;
  }
  displayNumBig(screenNum);
  console.log(screenNum);
}

for(let i = 0; i < numButtons.length; i++) {
  numButtons[i].addEventListener('click', () => {
    updateCurrButton(numButtons[i]);
    updateNums();
    appendNum(i);
  });

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
  }
  alert('Cannot Divide By Zero');
  clearScreen();
  return 0;
}

let operate = (num1, operator, num2) => {
  if (operator !== "=") {
    if (operator === "+") {
      return add(num1, num2);
    } if (operator === "-") {
      return subtract(num1, num2);
    } if (operator === "*") {
      return multiply(num1, num2);
    } if (operator === "/") {
      return divide(num1, num2);
    } // add decimal operator
  }
}



