const consts = {
  e: Math.E,
  PI: Math.PI,
};

const operators = {
  '^': (a, b) => {
    return Math.pow(a, b);
  },
  log: (a, b) => {
    return Math.log(b) / Math.log(a);
  },
};

const functions = {
  sqrt: (a) => {
    return Math.sqrt(a);
  },
  sin: (a) => {
    return Math.sin(a);
  },
  cos: (a) => {
    return Math.cos(a);
  },
};

function calculate(expression) {
  const CONSTANTS = {
    e: Math.E,
    PI: Math.PI,
  };

  // ALWAYS SORT BY PRIORITY
  const OPERATORS = {
    '^': (a, b) => a ** b,
    '%': (a, b) => a % b,
    '/': (a, b) => {
      if (b === 0) throw new TypeError('Division by zero');
      return a / b;
    },
    '*': (a, b) => a * b,
    '-': (a, b) => a - b,
    '+': (a, b) => a + b,
  };

  const FUNCTIONS = {
    sqrt: (a) => {
      Math.sqrt(a);
    },
    sin: (a) => {
      Math.sin(a);
    },
    cos: (a) => {
      Math.cos(a);
    },
    log: (a, b) => {
      Math.log(b) / Math.log(a);
    },
  };

  const NUMBER_REGEXP = '(-?[0-9.]+)';

  function calc(expression) {
    console.log('first - ' + expression);
    for (let operator in OPERATORS) {
      let regExp = `${NUMBER_REGEXP}\\${operator}${NUMBER_REGEXP}`;
      let matches;
      while ((matches = expression.match(regExp))) {
        let [expr, a, b] = matches;
        let result = OPERATORS[operator](+a, +b);
        console.log(`result - ${result}`);
        expression =
          result == 0
            ? expression.replace(expr, '')
            : expression.replace(expr, result);
        console.log(expression);
      }
    }
  }

  expression = expression.replace(/\s/g, '');
  calc(expression);
}

// console.log(calculate('log(-1*(3+5)+2^6+e,2)*10*10-sqrt(4)'));
console.log(calculate(' 84 + 62 / 33 * 10 + 15 '));
