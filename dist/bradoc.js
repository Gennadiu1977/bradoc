(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.bradoc = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = require('./lib/bradoc');

},{"./lib/bradoc":2}],2:[function(require,module,exports){
/*
 * bradoc
 * 
 *
 * Copyright (c) 2013 Ju Goncalves
 * Licensed under the MIT license.
 */

'use strict';

var cpfdoc = require('./cpf');
var cnpjdoc = require('./cnpj');
var val = require('./valid');

var doc = function doc(_doc) {
  return {
    validate: function validate(number) {
      return val.is(_doc, _doc.deformat(number));
    },
    generate: function generate() {
      return _doc.format(_doc.gen());
    }
  };
};

exports.cpf = doc(cpfdoc);
exports.cnpj = doc(cnpjdoc);

},{"./cnpj":3,"./cpf":4,"./valid":6}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var generator = require('./gen');
var val = require('./valid');

var checksum = function checksum(digits) {
  if (![12, 13].includes(digits.length)) {
    return;
  }

  var weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  if (digits.length !== 12) {
    weights.unshift(6);
  }

  var code = void 0,
      checksum = void 0;

  var sum = digits.reduce(function (sum, current, index) {
    return sum += current * weights[index];
  }, 0);

  code = sum % 11;
  checksum = code < 2 ? 0 : 11 - code;

  return checksum;
};

var genChecksum = function genChecksum(digits) {
  if (!(digits instanceof Array)) {
    return;
  }

  digits.push(checksum(digits));
  digits.push(checksum(digits));

  return digits;
};

var type = function type() {
  return 'cnpj';
};

var gen = function gen() {
  var cnpj = generator.digits(12);

  return genChecksum(cnpj);
};

var format = function format(cnpj) {
  var regex = /^([\d]{2})([\d]{3})([\d]{3})([\d]{4})([\d]{2})$/;

  return val.format(cnpj, regex, '$1.$2.$3/$4-$5');
};

var deformat = val.deformat;

exports.checksum = checksum;
exports.genChecksum = genChecksum;
exports.type = type;
exports.gen = gen;
exports.format = format;
exports.deformat = deformat;

},{"./gen":5,"./valid":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var generator = require('./gen');
var val = require('./valid');

var checksum = function checksum(digits) {
  if (![10, 9].includes(digits.length)) {
    return;
  }

  var counter = digits.length === 9 ? 10 : 11;

  var sum = digits.reduce(function (previous, current) {
    return previous += current * counter--;
  }, 0);

  var code = sum % 11;
  var checksum = code < 2 ? 0 : 11 - code;

  return checksum;
};

var genChecksum = function genChecksum(digits) {
  if (!(digits instanceof Array)) {
    return;
  }

  digits.push(checksum(digits));
  digits.push(checksum(digits));

  return digits;
};

var type = function type() {
  return 'cpf';
};

var gen = function gen() {
  var cpf = generator.digits(9);

  return genChecksum(cpf);
};

var format = function format(cpf) {
  var regex = /^([\d]{3})([\d]{3})([\d]{3})([\d]{2})$/;

  return val.format(cpf, regex, '$1.$2.$3-$4');
};

var deformat = val.deformat;

exports.checksum = checksum;
exports.genChecksum = genChecksum;
exports.type = type;
exports.gen = gen;
exports.format = format;
exports.deformat = deformat;

},{"./gen":5,"./valid":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var digits = function digits(number) {
  if (![9, 12].includes(number)) {
    return;
  }

  return [].concat(_toConsumableArray(Array(number).keys())).map(function () {
    return 1 + Math.floor(Math.random() * 9);
  });
};

exports.digits = digits;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var is = function is(doc, toval) {
  if (!(toval instanceof Array) && doc.type() !== 'doc' && doc.type !== 'cnpj') {
    return false;
  }

  var limit = doc.type() === 'cpf' ? 9 : 12;

  if (toval.length - 2 > limit || toval.length - 2 < limit) {
    return false;
  }

  var csgen = doc.genChecksum(toval.slice(0, limit));

  if (csgen[limit] === toval[limit] && csgen[limit + 1] === toval[limit + 1]) {
    return true;
  }

  return false;
};

var format = function format(doc, regex, replace) {
  if (!(doc instanceof Array)) {
    return;
  }

  return doc.join('').replace(regex, replace);
};

var deformat = function deformat(doc) {
  if (typeof doc !== 'string') {
    return;
  }

  var regex = /[.\-\/]+/g;
  doc = doc.replace(regex, '');

  return [].concat(_toConsumableArray(Array(doc.length).keys())).map(function (number) {
    return parseInt(doc[number], 0);
  });
};

exports.is = is;
exports.format = format;
exports.deformat = deformat;

},{}]},{},[1])(1)
});