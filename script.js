function calculateExpression(expr) {
  // ALWAYS SORT BY PRIORITY
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
    log: (a, b) => Math.log(b) / Math.log(a),
    sqrt: (a) => Math.sqrt(a),
    sin: (a) => Math.sin(a),
    cos: (a) => Math.cos(a),
  };

  const NUMBER_REGEXP = '(-?[\\d.]+(?:e-?\\d+)?)';
  const BRACKETS_REGEXP = new RegExp(/\w*?\(([^()]*)\)/);

  function _parse(expression) {
    let deepestExp = _findDeepestExpression(expression);
    // console.log(deepestExp);
    if (deepestExp)
      return _parse(expression.replace(`(${deepestExp})`, _calc(deepestExp)));
    // console.log('almost + ' + expression);
    return _calc(expression);
  }

  function _findDeepestExpression(expression) {
    if (expression.search(/[()]/) == -1) return 0;
    if (expression.search(BRACKETS_REGEXP) == -1)
      throw new SyntaxError('ExpressionError: Brackets must be paired');

    return expression.match(BRACKETS_REGEXP)[1];
  }

  function _calc(expression) {
    // console.log('first - ' + expression);
    for (let operator in OPERATORS) {
      let regExp = `${NUMBER_REGEXP}\\${operator}${NUMBER_REGEXP}`;
      // console.log('regexp - ' + regExp);
      let matches;
      while ((matches = expression.match(regExp))) {
        let [expr, a, b] = matches;
        let result = OPERATORS[operator](+a, +b);
        // console.log(`here - ${result}`);
        expression = /[\d]/.test(expression[expression.indexOf(expr) - 1])
          ? expression.replace(expr, `+${result}`)
          : expression.replace(expr, result);
        // console.log(expression);
      }
    }
    // console.log('last - ' + expression);
    return +expression;
  }

  return _parse(expr.replace(/\s/g, ''));
}

console.log(
  calculateExpression(
    ' 24 - 23 * 17 / (  93 + 52 * 70 * (  6 + 91 / (  (  4 / 39 / 8 * 30  ) / (  22 * 97 * (  32 * 20 * (  82 - 80 * 51 / 89 * 9  ) * 56 + 82  ) * 89  ) - 17 - 17  ) / 29 / 81  )  ) '
  )
);
