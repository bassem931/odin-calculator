const numbers = "0123456789"
const operators = "+-/*="

const calculatorStack = [];
let operand1="";
let operator="";
let operand2="";

let isOperand1Mode = true;
let isOperand2Mode = false;
let isOperatorMode = false;

function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    if(b===0){
        return "cannot divide by zero"
}
    return a/b;
}

function reset(){
    calculatorStack.length =0;
    operand1="";
    operator="";
    operand2="";
    isOperand1Mode = true;
    isOperand2Mode = false;
    isOperatorMode = false;
}

function updateValues (buttonVal){
    if(numbers.includes(buttonVal)){
        if(isOperand1Mode){
            operand1 = operand1 + buttonVal;
        } else if(isOperand2Mode){
            operand2 = operand2 + buttonVal
        }
    } else if(operators.includes(buttonVal)){
        if(isOperand1Mode){
            if(buttonVal === "="){
                console.log("not a valid operator");
            }
            calculatorStack.push(operand1,buttonVal);
        }
        if(isOperand2Mode ){
            let result = "";
            calculatorStack.push(operand2,buttonVal);
            switch (calculatorStack[1]) {
                case "+":result = add(parseInt(calculatorStack[0]),parseInt(calculatorStack[2]))
                    break;
                case "-":result = subtract(parseInt(calculatorStack[0]),parseInt(calculatorStack[2]))
                    break;
                case "*":result = multiply(parseInt(calculatorStack[0]),parseInt(calculatorStack[2]))
                    break;
                case "/":result = divide(parseInt(calculatorStack[0]),parseInt(calculatorStack[2]))
                    break;
                default: //equal
                    break;
            }
            console.log("result is",result)
            if (buttonVal==="=") {
                calculatorStack.splice(0,4,result);
            } else{
                calculatorStack.splice(0,3,result);
            }

            //after equal if a number is pressed the equal number should be discarded
        }

        //update flags here to prevent entering both if conditions;
        isOperand1Mode = !isOperand1Mode;
        isOperand2Mode = !isOperand2Mode;
    }
    console.log(operand1,calculatorStack,operand2);
    
}


function addButtonListeners(){
    const buttons = document.querySelectorAll(".calc-button");
    for (const button of buttons) {
        button.addEventListener("click",(ev)=>{
            let buttonVal = button.textContent.trim();
            if(buttonVal==="C"){
                reset();
            }
            updateValues(buttonVal);
        })
    }
}

addButtonListeners()
