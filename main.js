const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_output = document.querySelector('.display .output');

let input = "";
let isNegated = false;
for (let key of keys) {
	const value = key.dataset.key;

	key.addEventListener('click', () => {
		if (value == "clear") {
			input = "";
			display_input.innerHTML = "";
			display_output.innerHTML = "";
		} else if (value == "backspace") {
			input = input.slice(0, -1);
			display_input.innerHTML = CleanInput(input);
		} else if (value == "=") {
			let result = eval(PerpareInput(input));

			display_output.innerHTML = CleanOutput(result);
		}    else if (value == "negate") {
            if (isNegated) {
                
                if (input.charAt(0) === '-') {
                    input = input.slice(1);
                }
            } else {
               
                input = '-' + input;
            }

            isNegated = !isNegated;
            display_input.innerHTML = CleanInput(input);
        } else {
			if (ValidateInput(value)) {
				input += value;
				display_input.innerHTML = CleanInput(input);
			}
		}
	})
}


function toggleMode() {
    const body = document.body;
    const modeIcon = document.getElementById('mode-icon');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        modeIcon.classList.remove('fa-sun');
        modeIcon.classList.add('fa-moon');
    } else {
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
    }
}

function CleanInput(input) {
	let input_array = input.split("");
	let input_array_length = input_array.length;

	for (let i = 0; i < input_array_length; i++) {
		if (input_array[i] == "*") {
			input_array[i] = ` <span class="operator">x</span> `;
		} else if (input_array[i] == "/") {
			input_array[i] = ` <span class="operator">÷</span> `;
		} else if (input_array[i] == "+") {
			input_array[i] = ` <span class="operator">+</span> `;
		} else if (input_array[i] == "-") {
			input_array[i] = ` <span class="operator">-</span> `;
		} else if (input_array[i] == "(") {
			input_array[i] = `<span class="brackets">(</span>`;
		} else if (input_array[i] == ")") {
			input_array[i] = `<span class="brackets">)</span>`;
		} else if (input_array[i] == "%") {
			input_array[i] = `<span class="percent">%</span>`;
		}
	}

	return input_array.join("");
}

function CleanOutput (output) {
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

function ValidateInput (value) {
	let last_input = input.slice(-1);
	let operators = ["+", "-", "*", "/"];

	if (value == "." && last_input == ".") {
		return false;
	}

	if (operators.includes(value)) {
		if (operators.includes(last_input)) {
			return false;
		} else {
			return true;
		}
	}

	return true;
}

function PerpareInput (input) {
	let input_array = input.split("");

	for (let i = 0; i < input_array.length; i++) {
		if (input_array[i] == "%") {
			input_array[i] = "/100";
		}
	}

	return input_array.join("");
}

const darkBtn = document.querySelector('.dark');
const lightBtn = document.querySelector('.light');
darkBtn.style = "opacity: 0.1";

darkBtn.addEventListener('click', () => {
	document.documentElement.classList.remove("light");
	document.documentElement.classList.add("dark");
	window.localStorage.setItem('mode', 'dark'); 
	darkBtn.style = "opacity: 0.5";
	lightBtn.style = "opacity: 1";
});

lightBtn.addEventListener('click', () => {
	document.documentElement.classList.remove("dark");
	document.documentElement.classList.add("light");
	window.localStorage.setItem('mode', 'light');
	darkBtn.style = "opacity: 1";
	lightBtn.style = "opacity: 0.5";
});

const mode = window.localStorage.getItem('mode');
if (mode == 'dark') { 
	document.documentElement.classList.remove("light");
	document.documentElement.classList.add("dark");
	darkBtn.style = "opacity: 0.5";
	lightBtn.style = "opacity: 1";
}

if (mode == 'light') { 
	document.documentElement.classList.remove("dark");
	document.documentElement.classList.add("light");
	darkBtn.style = "opacity: 1";
	lightBtn.style = "opacity: 0.5";
}
