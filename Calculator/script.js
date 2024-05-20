document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('#buttons .button');
    var operators = ['+', '-', '*', '/'];
    var decimalAdded = false;

    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            var display = document.getElementById('display');
            var displayVal = display.value;
            var buttonVal = this.textContent;

            switch (buttonVal) {
                case 'C':
                    display.value = '';
                    decimalAdded = false;
                    break;
                case '<':
                    display.value = display.value.slice(0, -1);
                    break;
                case '=':
                    try {
                        var equation = displayVal;
                        var lastChar = equation[equation.length - 1];

                        // Replace x with * for evaluation
                        equation = equation.replace(/x/g, '*');

                        // Remove trailing operator or decimal
                        if (operators.includes(lastChar) || lastChar === '.') {
                            equation = equation.slice(0, -1);
                        }

                        if (equation) {
                            display.value = eval(equation);
                        }
                        decimalAdded = false;
                    } catch (error) {
                        display.value = 'Error';
                    }
                    break;
                case '.':
                    if (!decimalAdded) {
                        display.value += buttonVal;
                        decimalAdded = true;
                    }
                    break;
                default:
                    if (operators.includes(buttonVal)) {
                        var lastChar = displayVal[displayVal.length - 1];

                        if (displayVal !== '' && !operators.includes(lastChar)) {
                            display.value += buttonVal;
                        } else if (displayVal === '' && buttonVal === '-') {
                            display.value += buttonVal;
                        }

                        if (operators.includes(lastChar) && displayVal.length > 1) {
                            display.value = displayVal.slice(0, -1) + buttonVal;
                        }
                        decimalAdded = false;
                    } else {
                        display.value += buttonVal;
                    }
                    break;
            }
        });
    });
});
