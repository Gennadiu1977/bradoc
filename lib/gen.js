'use strict';

exports.digits = function(number) {
  if(number !== 9 && number !== 12){
    return null;
  }

  var array = [];
  var i = 0;

  for(; i < number; i++){
    array.push(1 + Math.floor(Math.random() * 9));
  }

  return array;
};