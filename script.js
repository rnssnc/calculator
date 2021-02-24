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
  expression = expression.replace(' ', '').split('');

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
      if (functions[text]) return functions[text](factor());
      if (consts[text]) return consts[text];
      if (operators[text]) {
        let results = operators[text](factor(), factor());
        get();
        return results;
      }
      throw new Error('Parse error');
    }
    if (check() > '0' && check() < '9') return number();
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
    if (operators[check()]) {
      return (result = operators[get()](result, factor()));
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
}

console.log(calculate('log(-1*(3+5)+2^6+e,2)*10*10-sqrt(4)'));
