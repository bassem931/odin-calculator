const numbers = "0123456789."
const operators = "+-*=÷^"
const otherOperators = "∓⬅"

const calculatorStack = [];
let operand1 = "";
let operand2 = "";

let enterOp1Mode = true;
let enterOp2Mode = false;
let operatorAfter1Mode = false;
let operatorAfter2Mode = false;
let isEqualClicked = false;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "cannot divide by zero"
    }
    return a / b;
}

function power(a, b) {
    return Math.pow(a, b);
}

function displayToScreen(numScreen, exprScreen = calculatorStack.join(" ")) {
    document.querySelector(".expression-display").textContent = exprScreen;
    document.querySelector(".display-number").textContent = numScreen;
}

function backSpace(operand) {
    operand = operand.slice(0, operand.length - 1);
    displayToScreen(operand);
    return operand
}

function reset() {
    calculatorStack.length = 0;
    operand1 = "";
    operand2 = "";
    enterOp1Mode = true;
    enterOp2Mode = false;
    isOperatorMode = false;
    displayToScreen("", "");
}

function getResult(op, num1, num2) {
    switch (op) {
        case "+": return add(num1, num2)
        case "-": return subtract(num1, num2)
        case "*": return multiply(num1, num2)
        case "÷": return divide(num1, num2)
        case "÷": return divide(num1, num2)
        case "^": return power(num1, num2)
        default:
            return
    }
}

function checkNumValidity(buttonVal, num) {
    if (buttonVal === "." && !num.includes(".")) {
        return true;
    }
    num = ("" + num) + ("" + buttonVal);
    //optional minus sign and decimal point with \d being 0 to 9
    const onlyNumRegex = /^-?\d+(\.\d+)?$/;
    console.log(onlyNumRegex.test(num), num, buttonVal);
    if (onlyNumRegex.test(num)) {
        return true;
    }
    return false;
}

function setFirstOperand(buttonVal) {
    operand1 = operand1 + buttonVal;
    displayToScreen(operand1);
    operatorAfter1Mode = true;
}

function setSecondOperand(buttonVal) {
    operand2 = operand2 + buttonVal
    displayToScreen(operand2);
    operatorAfter2Mode = true;
}

function setFirstOperation(buttonVal) {
    if (buttonVal === "=") {
        console.log("not a valid operator");
        operatorAfter1Mode = true;
        return;
    }
    calculatorStack.push(operand1, buttonVal);
    displayToScreen(operand1)
    operatorAfter1Mode = false;
    enterOp1Mode = false;
    enterOp2Mode = true;
}

function setSecondOperation(buttonVal) {
    calculatorStack.push(operand2, buttonVal);

    let result = getResult(calculatorStack[1], parseFloat(calculatorStack[0]), parseFloat(calculatorStack[2]));
    result = "" + result

    console.log("result is", result)

    if (buttonVal === "=") {
        calculatorStack.splice(0, 4, result);
        displayToScreen(result, "");
        isEqualClicked = true
    } else {
        calculatorStack.splice(0, 3, result);
        displayToScreen(result);
    }
    operand1 = result
    operand2 = "";
    //after equal if a number is pressed the equal number should be discarded
    operatorAfter2Mode = false;
    enterOp1Mode = true;
    enterOp1Mode = false;
}

function updateValues(buttonVal) {

    if (numbers.includes(buttonVal)) {
        if (isEqualClicked) {
            enterOp1Mode = true;
            calculatorStack.pop();
            operand1 = buttonVal;
            displayToScreen(buttonVal)
            isEqualClicked = false;
            return;
        }
        let isValidNum = false
        if (enterOp1Mode) {
            isValidNum = checkNumValidity(buttonVal, operand1)
            if (isValidNum)
                setFirstOperand(buttonVal);
        } else if (enterOp2Mode) {
            isValidNum = checkNumValidity(buttonVal, operand2)
            if (isValidNum)
                setSecondOperand(buttonVal);
        }

    } else if (operators.includes(buttonVal)) {
        if (isEqualClicked) {
            if (buttonVal === "=") {
                isEqualClicked = true;
                return;
            }
            calculatorStack.push(buttonVal);
            displayToScreen(operand1)
            isEqualClicked = false;
            return;
        }
        if (operatorAfter1Mode) {
            setFirstOperation(buttonVal);
        }
        if (operatorAfter2Mode) {
            setSecondOperation(buttonVal);
        }
    } else if (otherOperators.includes(buttonVal)) {
        if (buttonVal === "⬅") {
            if (enterOp1Mode) {
                operand1 = backSpace(operand1)
            }
            else if (enterOp2Mode) {
                operand2 = backSpace(operand2)
            }
        }
    }
    console.log(operand1, calculatorStack, operand2);
}


function addButtonListeners() {
    const buttons = document.querySelectorAll(".calc-button");
    for (const button of buttons) {
        button.addEventListener("click", (ev) => {
            let buttonVal = button.textContent.trim();
            if (buttonVal === "C") {
                reset();
            }
            updateValues(buttonVal);
        })
    }
}

addButtonListeners()
