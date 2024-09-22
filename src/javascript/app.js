const calculatorStack = [];
let operand1="";
let operator="";
let operand2="";
const numbers = "0123456789"
const operators = "+-/*="
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

function updateValues (buttonVal){
    if(numbers.includes(buttonVal)){
        console.log(isOperand1Mode,buttonVal);
        if(isOperand1Mode){
            operand1 = operand1 + buttonVal;
        } else if(isOperand2Mode){
            operand2 = operand2 + buttonVal
        }
    } else if(operators.includes(buttonVal)){
        if(isOperand1Mode){
            calculatorStack.push(operand1,buttonVal);
            isOperand1Mode = false;
            isOperand2Mode = true;
        }
        if(isOperand2Mode){

        }
        
    }
    console.log(operand1,calculatorStack,operand2);
    
}


function addButtonListeners(){
    const buttons = document.querySelectorAll(".calc-button");
    for (const button of buttons) {
        button.addEventListener("click",(ev)=>{
            let buttonVal = button.textContent.trim();
            if(buttonVal==="C"){
                //clear function
            }
            updateValues(buttonVal);
        })
    }
}

addButtonListeners()
