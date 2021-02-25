const CONSTANTS = {
  e: Math.E,
  PI: Math.PI,
};

const OPERATORS = {
  '^': (a, b) => a ** b,
  '%': (a, b) => a % b,
  '/': (a, b) => {
    if (b === 0) throw new TypeError('TypeError: Division by zero.');
    return a / b;
  },
  '*': (a, b) => a * b,
  '-': (a, b) => a - b,
  '+': (a, b) => a + b,
};

const FUNCTIONS = {
  sqrt: (a) => Math.sqrt(a),
  sin: (a) => Math.sin(a),
  cos: (a) => Math.cos(a),
  log: (a, b) => Math.log(b) / Math.log(a),
};

const OPERATORS_TO_NORMALIZE = () => Object.keys(BINARY_OPERATORS).join('\\');
const PARSE_REGEXP = new RegExp(
  `-[0-9.]+[${OPERATORS_TO_NORMALIZE()}]-?[0-9.]+`
);

let expression = expr.replace(/\s/g, '').split('');

function check() {
  return expression[0] || '';
}

function get() {
  return expression.shift();
}

function number() {
  let result = get();
  while ((check() >= '0' && check() <= '9') || check == '.') result += get();
  return parseFloat(result);
}

function str() {
  let result = get();
  while (check() >= 'a' && check() <= 'z') result += get();
  return result;
}

function factor() {
  if (check() >= 'a' && check() <= 'z') {
    let text = str();
    if (FUNCTIONS[text]) return FUNCTIONS[text](factor());
    if (CONSTANTS[text]) return CONSTANTS[text];
    if (OPERATORS[text]) {
      let results = OPERATORS[text](factor(), factor());
      get();
      return results;
    }
    throw new Error('Parse error');
  }
  if (check() >= '0' && check() <= '9') return number();
  if (check() == '(') {
    get(); // (
    let results = parse();
    get(); // )
    return results;
  }
  if (check() == '-') return -factor(get());
}

function term() {
  var result = factor();
  if (OPERATORS[check()]) {
    return (result = OPERATORS[get()](result, factor()));
  }
  while (check() == '*' || check() == '/') {
    if (get() == '*') {
      result *= factor();
    } else {
      result /= factor();
    }
  }
  return result;
}

function parse() {
  var result = term();
  // console.log(result);
  // console.log(expression);
  while (check() == '+' || check() == '-') {
    if (get() == '+') {
      result += term();
    } else {
      result -= term();
    }
  }
  return result;
}

return parse();
