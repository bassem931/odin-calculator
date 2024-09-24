const numbers = "0123456789."
const operators = "+-*=÷^"
const otherOperators = "∓⬅"

const calculatorStack = [];
let operand1 = "";
let operand2 = "";

let isOp1Mode = true;
let isOp2Mode = false;
let isOpAfter1Mode = false;
let isOpAfter2Mode = false;
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
        displayToScreen("division Error Press C", "")
        return "0 div";
    }
    return a / b;
}

function power(a, b) {
    return Math.pow(a, b);
}

function negate(num) {
    return `${parseFloat(num) * -1}`;
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
    isOp1Mode = true;
    isOp2Mode = false;
    isOperatorMode = false;
    isEqualClicked = false;
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
    if (buttonVal === "." && num === "") {
        return false;
    }
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
    isOpAfter1Mode = true;
}

function setSecondOperand(buttonVal) {
    operand2 = operand2 + buttonVal
    displayToScreen(operand2);
    isOpAfter2Mode = true;
}

function setFirstOperation(buttonVal) {
    if (buttonVal === "=") {
        console.log("not a valid operator");
        isOpAfter1Mode = true;
        return;
    }
    calculatorStack.push(operand1, buttonVal);
    displayToScreen(operand1)
    isOpAfter1Mode = false;
    isOp1Mode = false;
    isOp2Mode = true;
}

function setSecondOperation(buttonVal) {
    calculatorStack.push(operand2, buttonVal);

    let result = getResult(calculatorStack[1], parseFloat(calculatorStack[0]), parseFloat(calculatorStack[2]));
    result = "" + result

    console.log("result is", result)

    if (result === "0 div") {
        isOp1Mode = true;
        isOp2Mode = false;
        isOpAfter1Mode = false
        isOpAfter2Mode = false
        calculatorStack.splice(0, calculatorStack.length)
        operand1 = "";
        operand2 = "";
        return
    }

    if (buttonVal === "=") {
        calculatorStack.splice(0, 4, result);
        displayToScreen(result, "");
        isEqualClicked = true
        isOpAfter1Mode = true;
        isOp1Mode = false;
        isOp2Mode = true;
    } else {
        calculatorStack.splice(0, 3, result);
        displayToScreen(result);
        isOp1Mode = false;
        isOp2Mode = true;
    }
    operand1 = result
    operand2 = "";
    //after equal if a number is pressed the equal number should be discarded
    isOpAfter2Mode = false;

}

function updateValues(buttonVal) {

    if (numbers.includes(buttonVal)) {
        if (isEqualClicked) {
            isOp1Mode = true;
            calculatorStack.pop();
            operand1 = buttonVal;
            displayToScreen(buttonVal)
            isEqualClicked = false;
            return;
        }
        let isValidNum = false
        if (isOp1Mode) {
            isValidNum = checkNumValidity(buttonVal, operand1)
            if (isValidNum)
                setFirstOperand(buttonVal);
        } else if (isOp2Mode) {
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
            isOp2Mode = true;
            return;
        }

        //in case op is entered again then user want to change operation
        // if (isOp2Mode === true && isOpAfter1Mode === false) {
        //     isOp2Mode = false
        // }

        if (isOpAfter1Mode) {
            if (operand1 !== "") {
                setFirstOperation(buttonVal);
            }
        }
        if (isOpAfter2Mode) {
            if (operand2 !== "") {
                setSecondOperation(buttonVal);
            }
        }
    } else if (otherOperators.includes(buttonVal)) {
        if (isOp1Mode) {
            if (operand1 !== "") {
                if (buttonVal === "⬅") {
                    operand1 = backSpace(operand1)
                } else {
                    operand1 = negate(operand1);
                }
                displayToScreen(operand1)
            }
        } else if (isOp2Mode) {
            if (operand2 !== "") {
                if (buttonVal === "⬅") {
                    operand2 = backSpace(operand2)
                } else {
                    operand2 = negate(operand2);
                }
                displayToScreen(operand2)
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
