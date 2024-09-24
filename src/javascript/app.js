const numbers = "0123456789."
const operators = "+-*=÷"

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
    document.querySelector(".display-number").textContent = "";
    document.querySelector(".expression-display").textContent = "";
}

function getResult(op,num1,num2){
    switch (op) {
        case "+":return add(num1,num2)
            break;
        case "-":return subtract(num1,num2)
            break;
        case "*":return multiply(num1,num2)
            break;
        case "÷":return divide(num1,num2)
            break;
        default: //equal
            break;
    }
}


function updateValues (buttonVal){

    if(numbers.includes(buttonVal)){
        if(isOperand1Mode){
            operand1 = operand1 + buttonVal;
            document.querySelector(".display-number").textContent = operand1;
        } else if(isOperand2Mode){
            operand2 = operand2 + buttonVal
            document.querySelector(".display-number").textContent = operand2;
        }
    
    } else if(operators.includes(buttonVal)){
        if(isOperand1Mode){
            if(buttonVal === "="){
                console.log("not a valid operator");
            }
            calculatorStack.push(operand1,buttonVal);  
            document.querySelector(".expression-display").textContent = calculatorStack.join(" ");
        }
        if(isOperand2Mode ){
            calculatorStack.push(operand2,buttonVal);
            let result = getResult(calculatorStack[1],parseInt(calculatorStack[0]),parseInt(calculatorStack[2]));

            console.log("result is",result)
            document.querySelector(".display-number").textContent = result;
            document.querySelector(".expression-display").textContent = "";

            if (buttonVal==="=") {
                calculatorStack.splice(0,4,result);
            } else{
                calculatorStack.splice(0,3,result);
            }
            operand1=result.toString();
            operand2="";
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
