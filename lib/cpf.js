'use strict';

var gen = require('./gen');
var val = require('./valid');

exports.checksum = function(digits) {
  
  if(digits.length !== 9 && digits.length !== 10){
    return null;
  }

  var sum = 0;
  var code, checksum;
  var counter = digits.length === 9 ? 10 : 11;

  digits.forEach(function(el){
    sum = sum + (el * counter);
    counter = counter - 1;
  });

  code = sum % 11;
  checksum = code < 2 ? 0 : 11 - code;

  return checksum;
};

exports.genChecksum = function(digits){
  if(!(digits instanceof Array)){
    return null;
  }

  digits.push(this.checksum(digits));
  digits.push(this.checksum(digits));

  return digits;

};

exports.type = function(){
  return 'cpf';
};

exports.gen = function(){
  var cpf = gen.digits(9);

  return this.genChecksum(cpf);
};

exports.format = function(cpf){
  var regex = /^([\d]{3})([\d]{3})([\d]{3})([\d]{2})$/;

  return val.format(cpf, regex, '$1.$2.$3-$4');
};

exports.deformat = val.deformat;