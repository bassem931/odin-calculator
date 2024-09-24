const numbers = "0123456789."
const operators = "+-*=÷"

const calculatorStack = [];
let operand1="";
let operator="";
let operand2="";

let enterOp1Mode = true;
let enterOp2Mode = false;
let operatorAfter1Mode = false;
let operatorAfter2Mode = false;

function add(a,b) {
    console.log(a+b,a,b);
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

function displayToScreen(numScreen,exprScreen = calculatorStack.join(" ")) {
    document.querySelector(".expression-display").textContent = exprScreen;
    document.querySelector(".display-number").textContent = numScreen;
    
}

function reset(){
    calculatorStack.length =0;
    operand1="";
    operator="";
    operand2="";
    enterOp1Mode = true;
    enterOp2Mode = false;
    isOperatorMode = false;
    displayToScreen("");
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
        if(enterOp1Mode){
            operand1 = operand1 + buttonVal;
            displayToScreen(operand1);
            operatorAfter1Mode = true;
        } else if(enterOp2Mode){
            operand2 = operand2 + buttonVal
            displayToScreen(operand2);
            operatorAfter2Mode = true;
        }
    
    } else if(operators.includes(buttonVal)){
        if(operatorAfter1Mode){
            if(buttonVal === "="){
                console.log("not a valid operator");
            }
            calculatorStack.push(operand1,buttonVal); 
            displayToScreen(operand1)
            operatorAfter1Mode = false;
            enterOp1Mode = false;
            enterOp2Mode = true;
        }
        if(operatorAfter2Mode ){

            calculatorStack.push(operand2,buttonVal);

            let result = getResult(calculatorStack[1],parseFloat(calculatorStack[0]),parseFloat(calculatorStack[2]));
            result = ""+ result

            console.log("result is",result)

            if (buttonVal==="=") {
                calculatorStack.splice(0,4,result);
                displayToScreen(result,"");
                // enterOp1Mode = 
            } else{
                calculatorStack.splice(0,3,result);
                displayToScreen(result);
            }
            operand1=result
            operand2="";
            //after equal if a number is pressed the equal number should be discarded
            operatorAfter2Mode = false;
            enterOp1Mode = true;
            enterOp1Mode = false;
        }

        //update flags here to prevent entering both if conditions;
        // enterOp1Mode = !enterOp1Mode;
        // enterOp2Mode = !enterOp2Mode;
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
