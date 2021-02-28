function calculateExpression(expression) {
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
    console.log('string - ' + expression);
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

  function _calc(_expression) {
    // _expression = _expression.replace(/[^\d\/\*\-\+\^]?(--)/, '');
    _expression = _expression.replace(/([\+\-\/\*])(--)|(^--)/, '$1');

    // console.log('first - ' + _expression);
    for (let operator in OPERATORS) {
      let regExp = `${NUMBER_REGEXP}\\${operator}${NUMBER_REGEXP}`;
      let match;
      while ((match = _expression.match(regExp))) {
        let [expr, a, b] = match;
        let result = OPERATORS[operator](+a, +b);
        // console.log(`here - ${result}`);
        _expression = /[\d]/.test(_expression[_expression.indexOf(expr) - 1])
          ? _expression.replace(expr, `+${result}`)
          : _expression.replace(expr, result);

        // console.log('expr - ' + _expression);
      }
    }
    // console.log('last - ' + _expression);
    return +_expression;
  }

  return _parse(expression.replace(/\s/g, ''));
}
// console.log(
//   calculateExpression(
//     ' 24 - 23 * 17 / (  93 + 52 * 70 * (  6 + 91 / (  (  4 / 39 / 8 * 30  ) / (  22 * 97 * (  32 * 20 * (  82 - 80 * 51 / 89 * 9  ) * 56 + 82  ) * 89  ) - 17 - 17  ) / 29 / 81  )  ) '
//   )
// );
