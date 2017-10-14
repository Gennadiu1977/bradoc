'use strict';

const generator = require('./gen');
const val = require('./valid');

const checksum = digits => {
  if (![12, 13].includes(digits.length)) {
    return;
  }

  let weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  
  if (digits.length !== 12) {
    weights.unshift(6);
  }

  let code, checksum;

  let sum = digits.reduce((sum, current, index) => sum += current * weights[index], 0);

  code = sum % 11;
  checksum = code < 2 ? 0 : 11 - code;

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

const type = () => 'cnpj';

const gen = () => {
  let cnpj = generator.digits(12);

  return genChecksum(cnpj);
};

const format = cnpj => {
  let regex = /^([\d]{2})([\d]{3})([\d]{3})([\d]{4})([\d]{2})$/;
  
  return val.format(cnpj, regex, '$1.$2.$3/$4-$5');
};

const deformat = val.deformat;

export {checksum, genChecksum, type, gen, format, deformat};