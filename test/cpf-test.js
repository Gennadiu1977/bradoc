'use strict';

const chai = require('chai');
const expect = chai.expect;
const cpf = require('../lib/cpf');
const gen = require('../lib/gen');
const val = require('../lib/valid');

describe('CPF Checksum Gen', () => {
  it('does accept 9 digits', () => {
    expect(cpf.checksum([1,2,3,4,5,6,7,8,9])).to.exist;
  });

  it('does accept 10 digits', () => {
    expect(cpf.checksum([1,2,3,4,5,6,7,8,9,10])).to.exist;
  });

  it('does not accept more than 10 digits', () => {
    expect(cpf.checksum([0,1,2,3,4,5,6,7,8,9,10])).to.not.exist;
  });

  it('does not accept less than 9 digits', () => {
    expect(cpf.checksum([1,2,3,4,5,6,7,8])).to.not.exist;
  });

  it('does return a checksum lower than 11', () => {
    expect(cpf.checksum(gen.digits(9))).to.be.below(11);
  });

  it('does return a checksum bigger than or equal to 0', () => {
    expect(cpf.checksum(gen.digits(9))).to.be.at.least(0);
  });
});

describe('CPF Generator', () => {
  it('does return an array', () => {
    expect(cpf.gen()).to.be.a('array');
  });

  it('does return 11-length array', () => {
    expect(cpf.gen().length).to.be.equal(11);
  });

  it('does return a number array', () => {
    cpf.gen().forEach(el => {
      expect(el).to.be.a('number');
    });
  });
});

describe('CPF Validator', () => {
  it('does return a boolean', () => {
    expect(val.is(cpf, cpf.gen())).to.be.a('boolean');
  });

  it('does return true when valid', () => {
    expect(val.is(cpf, cpf.gen())).to.be.true;
  });

  [...Array(10).keys()].forEach(number => {
    it(`does return true for repeated numbers, case: ${number}`, () => {
      expect(val.is(cpf, [...Array(11)].map(() => number))).to.be.true;
    });
  });

  it('does return false when not valid', () => {
    expect(val.is(cpf, [1,2,3,4,5,6,7,8,9,10,11,12])).to.be.false;
  });

  it('does return false when exists invalid characters', () => {    
    var test = cpf.gen();
    test.push('x');
    expect(val.is(cpf, val.deformat(cpf.format(test)))).to.be.false;
  });
});