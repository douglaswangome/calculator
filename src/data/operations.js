const numberTest = (number) => {
  return number - Math.floor(number) !== 0 ? true : false;
}

const operator = (value1, value2, sign) => {
  value1 = parseFloat(value1);
  value2 = parseFloat(value2);

  if (sign === "+") {
    return numberTest(value1) || numberTest(value2) ? 
      (value1 + value2).toPrecision(6) 
      : 
      value1 + value2;
  } else if (sign === "-") {
    return numberTest(value1) || numberTest(value2) ? 
      (value1 - value2).toPrecision(6) 
      : 
      value1 - value2;
  } else if (sign === "*") {
    return numberTest(value1) || numberTest(value2) ? 
      (value1 * value2).toPrecision(6) 
      : 
      value1 * value2;
  } else if (sign === "/") {
    return numberTest(value1) || numberTest(value2) ? 
      (value1 / value2).toPrecision(6) 
      : 
      value1 / value2;
  } else if (sign === "%") {
    return numberTest(value1) || numberTest(value2) ? 
      (value1 % value2).toPrecision(6) 
      : 
      value1 % value2;
  }
}

const negation = (value) => {
  return -1*value;
}

export { operator, negation };