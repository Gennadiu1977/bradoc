'use strict';

const gen = require('./gen');
const val = require('./valid');

exports.checksum = digits => {
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

exports.genChecksum = digits => {
  if(!(digits instanceof Array)){
    return;
  }

  digits.push(this.checksum(digits));
  digits.push(this.checksum(digits));

  return digits;
};

exports.type = () => 'cnpj';

exports.gen = () => {
  let cnpj = gen.digits(12);

  return this.genChecksum(cnpj);
};

exports.format = cnpj => {
  let regex = /^([\d]{2})([\d]{3})([\d]{3})([\d]{4})([\d]{2})$/;
  
  return val.format(cnpj, regex, '$1.$2.$3/$4-$5');
};

exports.deformat = val.deformat;
