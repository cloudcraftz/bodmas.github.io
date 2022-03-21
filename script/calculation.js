var priority = function (operator) {
    switch (operator) {
        case '+':
        case '-':
            return (1);
        case '*':
        case '/':
            return (2);
        default:
            return (-1);
    }
}

var calculateValue = function (num1, operator, num2) {
    switch (operator) {
        case '+':
            return (num1 + num2);
        case '-':
            return (num1 - num2);
        case '*':
            return (num1 * num2);
        case '/':
            return (num1 / num2);
    }
}

var convertToPostfix = function (infix) {
    var operators = [];
    var postfix = '';
    for (var i = 0; i < infix.length; i++) {
        if ((infix[i] >= '0' && infix[i] <= '9') || infix[i] == '.') {
            postfix += infix[i];
        }
        else {
            postfix += ' ';
            if (operators.length === 0) {
                operators.push(infix[i]);
            }
            else {
                if (priority(infix[i]) > priority(operators[operators.length - 1])) {
                    operators.push(infix[i]);
                }
                else {
                    while (!(operators.length === 0) && priority(infix[i]) <= priority(operators[operators.length - 1])) {
                        var ch = operators[operators.length - 1];
                        operators.pop();
                        postfix += ch;
                    }
                    operators.push(infix[i]);
                }
            }
        }
    }
    postfix += ' ';
    while (!(operators.length === 0)) {
        var ch = operators[operators.length - 1];
        postfix += ch;
        operators.pop();
    }
    return (postfix);
}

var postfix_evaluation = function (postfix) {
    var answer = [], n, result;
    for (var i = 0; i < postfix.length; i++) {
        if ((postfix[i] >= '0' && postfix[i] <= '9') || postfix[i] == '.') {
            var number = '';
            while (postfix[i] != ' ') {
                number += postfix[i];
                i++;
            }
            n = parseFloat(number);
            answer.push(n);
        }
        else {
            if (answer.length < 2) {
                result = 'INVALID';
                return (result);
            } else {
                var num2 = answer[answer.length - 1];
                answer.pop();
                var num1 = answer[answer.length - 1];
                answer.pop();
                result = calculateValue(num1, postfix[i], num2);
                answer.push(result);
            }
        }
    }
    var finalAns = answer[answer.length - 1];
    answer.pop();
    if (answer.length === 0) {
        return (finalAns);
    } else {
        return ('INVALID');
    }
}

