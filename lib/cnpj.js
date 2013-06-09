'use strict';

var gen = require('./gen');

exports.checksum = function(digits) {

  if(digits.length !== 12 && digits.length !== 13){
    return null;
  }

  var weights = digits.length === 12 ? 
      [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : 
      [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  var sum = 0;
  var code, checksum;

  digits.forEach(function(el, index){
    sum = sum + (el * weights[index]);
  });

  code = sum % 11;
  checksum = code < 2 ? 0 : 11 - code;

  return checksum;
  
};

exports.genChecksum = function(digits){
  if(!(digits instanceof Array)&& digits){
    return null;
  }

  digits.push(this.checksum(digits));
  digits.push(this.checksum(digits));

  return digits;

};

exports.type = function(){
  return 'cnpj';
};

exports.gen = function(){
  var cnpj = gen.digits(12);

  return this.genChecksum(cnpj);
};

exports.format = function(cnpj){
  if(!(cnpj instanceof Array)){
    return null;
  }

  var regex = /^([\d]{2})([\d]{3})([\d]{3})([\d]{4})([\d]{2})$/;
  cnpj = cnpj.join('');
  cnpj = cnpj.replace(regex,'$1.$2.$3/$4-$5');

  return cnpj;
};

exports.deformat = function(cnpj){
  var check = typeof cnpj === 'string';
  if(!check){
    return null;
  }

  var regex = /[^0-9]+/g;
  cnpj = cnpj.replace(regex, '');

  return cnpj;
};