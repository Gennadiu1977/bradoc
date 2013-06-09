'use strict';

var chai = require('chai');
var expect = chai.expect;
var srand = require('srand');
var cpf = require('../lib/cpf-checksum.js');

describe('CPF Checksum Gen', function() {

  it('does accept 9 digits', function() {
    expect(cpf.checksum([1,2,3,4,5,6,7,8,9])).to.exist;
  });

  it('does accept 10 digits', function() {
    expect(cpf.checksum([1,2,3,4,5,6,7,8,9, 10])).to.exist;
  });

  it('does not accept more than 10 digits', function() {
    expect(cpf.checksum([0,1,2,3,4,5,6,7,8,9,10])).to.not.exist;
  });

  it('does not accept less than 9 digits', function() {
    expect(cpf.checksum([1,2,3,4,5,6,7,8])).to.not.exist;
  });

});

var getArray = function(){
  var array = [];

  srand.seed(new Date);
  array.length = 9;

  array.forEach(function(el){
    el = srand.rand();
  });

  return array;
};

describe('CPF Checksum Gen', function() {

  it('does return a checksum lower than 11', function() {
    expect(cpf.checksum(getArray())).to.be.below(11);
  });

  it('does return a checksum bigger than or equal to 0', function() {
    expect(cpf.checksum(getArray())).to.be.at.least(0);
  });

});