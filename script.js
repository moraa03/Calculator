const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

// string input
let input = "";
 
// get the value of each key
for (let key of keys) {
    const value = key.dataset.key;

    key.addEventListener('click', () => {
        /* if key clicked is AC you want to clear input and output */
        if (value == "clear") {
            input = "";
            display_input.innerHTML = "";
            display_output.innerHTML = "";
        
        /* if key clicked is backspace you want to remove last thing in input */
        } else if (value == "backspace") {
            input = input.slice(0, -1);
            display_input.innerHTML = cleanInput(input);

        /* if key clicked is = you want toget the result */
        } else if (value == "=") {
            try {
                // Log the input and prepared input
                console.log("Input:", input);
                let preparedInput = prepareInput(input);
                console.log("Prepared Input:", preparedInput);
        
                // Evaluate the expression
                let result = eval(preparedInput);
        
                // Display the result
                display_output.innerHTML = cleanOutput(result);
            } catch (error) {
                console.error("Error evaluating expression:", error);
                display_output.innerHTML = "Error";
            }
            // let result = eval(prepareInput(input));
            // display_output.innerHTML = cleanOutput(result);
        
        /* if key clicked is () you want to ... */
        } else if (value == "brackets") {
            /* 1. check if there is an opening bracket and not a closing one
               2. check that there are both opening and closing brackets and that
                  the opening bracket comes before the closing brcacket */

                if (
                    (input.indexOf("(") == -1) || 
                    (input.indexOf("(") != -1 &&
                    input.indexOf(")") != -1 && 
                    input.lastIndexOf("(") < input.lastIndexOf(")"))
                ) {
                    input += "(";
            
            /* 1. check if you have a starting bracket and an ending bracket
               2. check if you have a starting bracket and an ending bracket and 
                  the starting bracket appear after the ending bracket */

                } else if (
                    input.indexOf("(") != -1 && 
                    input.indexOf(")") == -1 ||
                    input.indexOf("(") != -1 && 
                    input.indexOf(")") != -1 && 
                    input.lastIndexOf("(") > input.lastIndexOf(")")
                ) {
                    input += ")";
                }
                display_input.innerHTML = cleanInput(input);
        } else {
            if (validateInput(value)) {
                input += value;
                display_input.innerHTML = cleanInput(input);
            }
        }
    })
}

function cleanInput(input) {
    let input_array = input.split("");
    let input_array_length = input_array.length;

    for (let i = 0; i < input_array_length; i++) {
        // Only replace for display purposes, not affecting actual input for eval
        if (input_array[i] == "*") {
            input_array[i] = ' <span class="operator">x</span> ';
        } else if (input_array[i] == "/") {
            input_array[i] = ' <span class="operator">÷</span> ';
        } else if (input_array[i] == "+") {
            input_array[i] = ' <span class="operator">+</span> ';
        } else if (input_array[i] == "-") {
            input_array[i] = ' <span class="operator">-</span> ';
        } else if (input_array[i] == "(") {
            input_array[i] = ' <span class="brackets">(</span> ';
        } else if (input_array[i] == ")") {
            input_array[i] = ' <span class="brackets">)</span> ';
        } else if (input_array[i] == "%") {
            input_array[i] = ' <span class="percent">%</span> ';
        }
    }
    return input_array.join("");
}

function cleanOutput(output) {
    let output_string = output.toString();
    let decimal = output_string.split(".")[1];
    output_string = output_string.split(".")[0];

    let output_array = output_string.split("");

    if (output_array.length > 3) {
        for (let i = output_array.length - 3; i > 0; i -= 3) {
            output_array.splice(i, 0, ",");
        }
    }

    if (decimal) {
        output_array.push(".");
        output_array.push(decimal);
    }
    return output_array.join("");
}

function validateInput(value) {
    let last_input = input.slice(-1);
    let operators = ['+', '-', '/', '*'];

    if (value == "." && last_input == ".") {
        return false;
    }

    if (operators.includes(value) && operators.includes(last_input)) {
        return false;
    }
    return true;  
}


function prepareInput(input) {
    let input_array = input.trim().split(/\s+/); // Split by spaces

    for (let i = 0; i < input_array.length; i++) {
        if (input_array[i] == "%") {
            input_array[i] = "/100";
        }
        // Replace x with * for evaluation
        if (input_array[i] == "x") {
            input_array[i] = "*";
        }
    }
    return input_array.join(""); // This returns a valid mathematical expression for eval
}
