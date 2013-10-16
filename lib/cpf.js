'use strict';

var gen = require('./gen');

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
  if(!(cpf instanceof Array)){
    return null;
  }

  var regex = /^([\d]{3})([\d]{3})([\d]{3})([\d]{2})$/;
  cpf = cpf.join('');
  cpf = cpf.replace(regex,'$1.$2.$3-$4');

  return cpf;
};

exports.deformat = function(cpf){
  var check = typeof cpf === 'string';
  if(!check){
    return null;
  }

  var regex = /[^0-9]+/g;
  cpf = cpf.replace(regex, '');

  var i = 0,
      cpfArray = [];

  for(; i <= cpf.length - 1; i++){
    cpfArray.push(parseInt(cpf[i]));
  }

  return cpfArray;
};