'use strict';

var chai = require('chai');
var expect = chai.expect;
var cnpj = require('../lib/cnpj');
var gen = require('../lib/gen');
var val = require('../lib/valid');

describe('CNPJ Checksum Gen', function() {

  it('does accept 12 digits', function() {
    expect(cnpj.checksum([1,2,3,4,5,6,7,8,9,10,11,12])).to.exist;
  });

  it('does accept 13 digits', function() {
    expect(cnpj.checksum([1,2,3,4,5,6,7,8,9,10,11,12,13])).to.exist;
  });

  it('does not accept more than 13 digits', function() {
    expect(cnpj.checksum([0,1,2,3,4,5,6,7,8,9,10,11,12,13])).to.not.exist;
  });

  it('does not accept less than 12 digits', function() {
    expect(cnpj.checksum([1,2,3,4,5,6,7,8,9,10,11])).to.not.exist;
  });

  it('does return a checksum lower than 11', function() {
    expect(cnpj.checksum(gen.digits(12))).to.be.below(11);
  });

  it('does return a checksum bigger than or equal to 0', function() {
    expect(cnpj.checksum(gen.digits(12))).to.be.at.least(0);
  });

});

describe('CNPJ Generator', function() {

  it('does return a array', function() {
    expect(cnpj.gen()).to.be.a('array');
  });

  it('does return 14-length array', function() {
    expect(cnpj.gen().length).to.be.equal(14);
  });

});

describe('CNPJ Validator', function() {

  it('does return a boolean', function() {
    expect(val.is(cnpj, cnpj.gen())).to.be.a('boolean');
  });

  it('does return true when valid', function() {
    expect(val.is(cnpj, cnpj.gen())).to.be.true;
  });

  it('does return false when not valid', function() {
    expect(val.is(cnpj, [1,2,3,4,5,6,7,8,9,10,11,12,13,14])).to.be.false;
  });

  it('does return false when exists invalid characters', function() {
    var test = cnpj.gen();
    test.push('x');
    expect(val.is(cnpj, val.deformat(cnpj.format(test)))).to.be.false;
  });

});