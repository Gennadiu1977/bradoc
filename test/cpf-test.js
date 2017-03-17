'use strict';

var chai = require('chai');
var expect = chai.expect;
var cpf = require('../lib/cpf');
var gen = require('../lib/gen');
var val = require('../lib/valid');

describe('CPF Checksum Gen', function() {

  it('does accept 9 digits', function() {
    expect(cpf.checksum([1,2,3,4,5,6,7,8,9])).to.exist;
  });

  it('does accept 10 digits', function() {
    expect(cpf.checksum([1,2,3,4,5,6,7,8,9,10])).to.exist;
  });

  it('does not accept more than 10 digits', function() {
    expect(cpf.checksum([0,1,2,3,4,5,6,7,8,9,10])).to.not.exist;
  });

  it('does not accept less than 9 digits', function() {
    expect(cpf.checksum([1,2,3,4,5,6,7,8])).to.not.exist;
  });

  it('does return a checksum lower than 11', function() {
    expect(cpf.checksum(gen.digits(9))).to.be.below(11);
  });

  it('does return a checksum bigger than or equal to 0', function() {
    expect(cpf.checksum(gen.digits(9))).to.be.at.least(0);
  });

});

describe('CPF Generator', function() {

  it('does return a array', function() {
    expect(cpf.gen()).to.be.a('array');
  });

  it('does return 11-length array', function() {
    expect(cpf.gen().length).to.be.equal(11);
  });

  it('does return a number array', function() {

    var array = cpf.gen();

    array.forEach(function(el){
      expect(el).to.be.a('number');
    });

  });

});

describe('CPF Validator', function() {

  it('does return a boolean', function() {
    expect(val.is(cpf, cpf.gen())).to.be.a('boolean');
  });

  it('does return true when valid', function() {
    expect(val.is(cpf, cpf.gen())).to.be.true;
  });

  it('does return false when not valid', function() {
    expect(val.is(cpf, [1,2,3,4,5,6,7,8,9,10,11,12])).to.be.false;
  });

  it('does return false when exists invalid characters', function() {    
    var test = cpf.gen();
    test.push('x');
    expect(val.is(cpf, val.deformat(cpf.format(test)))).to.be.false;
  });

});