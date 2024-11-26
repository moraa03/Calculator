# <!.... BreakDown of the JS Code ...>

1. Initial Set-Up
const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

- keys grab all the elements with the class .key(buttons).
- display_input grabs the .input div where the current calculation is shown(i.e. 5*5).
- display_output grabs the .output div where the result will be shown. 


2. Creating the Input Variable
let input = "";

- input is an empty string that is constantly updated when the user clicks a button, and will hold the current input from the user (i.e. "5*5").


3. Iterating over all the keys
for (let key of keys) {
    const value = key.dataset.key;
    key.addEventListener('click', () => {
        // Handle button click here
    });
}

- key.dataset.key grabs the value assigned to each button via the data-key attribute in the HTML (e.g., "*", "7", "+").
- for each key, an event listener is added so that when the user clicks the button, a specific function will be executed.


4. Handling button clicks
Inside the click event listener, depending on the button clicked, different actions are performed:

a) handling the "AC" button - clear input, clear display_input, clear display_output.
b) handling the "<" button - remove the last character in the input, then clean updated input using the cleanInput function.
c) handling the "=" button - prepare the input using the prepareInput function that converts the input string to a format suitable for evaluation(i.e. changing 'x' to '*'),
                             evaluate the input using the eval function, clean the result using cleanOutput function if needed, and lastly display_output. 
d) handling numbers and operators - add them to the input string, validate the input using the function validateInput(value), then clean the input using the cleanInput function. 


5. Formatting the Input for Display (cleanInput)
function cleanInput(input) {
    let input_array = input.split("");
    let input_array_length = input_array.length;

    for (let i = 0; i < input_array_length; i++) {
        if (input_array[i] == "*") {
            input_array[i] = ' <span class="operator">x</span> ';
        }
        // Similarly for other operators...
    }
    return input_array.join("");
}

- this function formats the input for display on display_input.
- it loops through each character in the input and wraps operators like *, /, +, -, etc., in HTML span elements with the correct class (for styling).


6. Formatting the Result for Display (cleanOutput)
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

- this function formats the result for display in display_output.
- it converts the result into a string and adds commas to large numbers for better readability.
- if there’s a decimal part, it ensures that the decimal and digits after it are also displayed.


7. Input Validation (validateInput)
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

- this function ensures that invalid input (like two consecutive operators or multiple decimals) isn’t allowed.


8. Preparing the Input for Evaluation (prepareInput)
function prepareInput(input) {
    let input_array = input.trim().split(/\s+/);

    for (let i = 0; i < input_array.length; i++) {
        if (input_array[i] == "%") {
            input_array[i] = "/100";
        }
        if (input_array[i] == "x") {
            input_array[i] = "*";
        }
    }
    return input_array.join("");
}


- this function formats the input before passing it to eval() for evaluation.
- it replaces x with * for multiplication and % with /100 for percentage.
- this ensures that eval() can correctly evaluate the mathematical expression.