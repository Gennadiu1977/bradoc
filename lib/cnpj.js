'use strict';

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