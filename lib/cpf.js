'use strict';

const gen = require('./gen');
const val = require('./valid');

exports.checksum = digits => {
  if (![10,9].includes(digits.length)){
    return;
  }

  let counter = digits.length === 9 ? 10 : 11;

  let sum = digits.reduce((previous, current) => previous += current * counter--, 0);

  let code = sum % 11;
  let checksum = code < 2 ? 0 : 11 - code;

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

exports.type = () => 'cpf';

exports.gen = () => {
  let cpf = gen.digits(9);

  return this.genChecksum(cpf);
};

exports.format = cpf => {
  let regex = /^([\d]{3})([\d]{3})([\d]{3})([\d]{2})$/;

  return val.format(cpf, regex, '$1.$2.$3-$4');
};

exports.deformat = val.deformat;