'use strict';

var srand = require('srand');

exports.getDigits = function(number){
  var array = [];

  srand.seed(new Date);
  array.length = number;

  array.forEach(function(el){
    el = srand.rand();
  });

  return array;
};