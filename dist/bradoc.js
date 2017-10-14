(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.bradoc = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require('./lib/bradoc')

},{"./lib/bradoc":2}],2:[function(require,module,exports){
/*
 * bradoc
 * 
 *
 * Copyright (c) 2013 Ju Goncalves
 * Licensed under the MIT license.
 */

 'use strict';

const cpfdoc = require('./cpf');
const cnpjdoc = require('./cnpj');
const val = require('./valid');

var doc = doc => {
  return {
    validate: number => val.is(doc, doc.deformat(number)),
    generate: () => doc.format(doc.gen())
  };
};

exports.cpf = doc(cpfdoc);
exports.cnpj = doc(cnpjdoc);
},{"./cnpj":3,"./cpf":4,"./valid":6}],3:[function(require,module,exports){
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

},{"./gen":5,"./valid":6}],4:[function(require,module,exports){
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
},{"./gen":5,"./valid":6}],5:[function(require,module,exports){
'use strict';

exports.digits = number => {
  if (![9, 12].includes(number)) {
    return;
  }

  return [...Array(number).keys()].map(() => 1 + Math.floor(Math.random() * 9));
};
},{}],6:[function(require,module,exports){
'use strict';

exports.is = (doc, toval) => {
  if(!(toval instanceof Array) && doc.type() !== 'doc' && doc.type !== 'cnpj'){
    return false;
  }

  let limit = doc.type() === 'cpf' ? 9 : 12;

  if(toval.length - 2 > limit || toval.length - 2 < limit) {
    return false;
  }

  let csgen = doc.genChecksum(toval.slice(0,limit));

  if(csgen[limit] === toval[limit] && csgen[limit + 1] === toval[limit + 1]){
    return true;
  }

  return false;
};

exports.format = (doc, regex, replace) => {
  if(!(doc instanceof Array)){
    return;
  }

  return doc.join('').replace(regex, replace);
};

exports.deformat = (doc) => {
  if(typeof doc !== 'string') {
    return;
  }
  
  let regex = /[.\-\/]+/g;
  doc = doc.replace(regex, '');

  return [...Array(doc.length).keys()].map(number => parseInt(doc[number], 0));
};
},{}]},{},[1])(1)
});