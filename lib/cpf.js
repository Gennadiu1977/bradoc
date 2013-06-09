'use strict';

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