'use strict';

const generator = require('./gen');
const val = require('./valid');

const checksum = digits => {
  if (![10,9].includes(digits.length)){
    return;
  }

  let counter = digits.length === 9 ? 10 : 11;

  let sum = digits.reduce((previous, current) => previous += current * counter--, 0);

  let code = sum % 11;
  let checksum = code < 2 ? 0 : 11 - code;

  return checksum;
};

const genChecksum = digits => {
  if(!(digits instanceof Array)){
    return;
  }

  digits.push(checksum(digits));
  digits.push(checksum(digits));

  return digits;
};

const type = () => 'cpf';

const gen = () => {
  let cpf = generator.digits(9);

  return genChecksum(cpf);
};

const format = cpf => {
  let regex = /^([\d]{3})([\d]{3})([\d]{3})([\d]{2})$/;

  return val.format(cpf, regex, '$1.$2.$3-$4');
};

const deformat = val.deformat;

export {checksum, genChecksum, type, gen, format, deformat};