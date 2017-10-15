'use strict';

const chai = require('chai');
const expect = chai.expect;
const cnpj = require('../lib/cnpj');
const gen = require('../lib/gen');
const val = require('../lib/valid');

describe('CNPJ Checksum Gen', () => {
  it('does accept 12 digits', () => {
    expect(cnpj.checksum([1,2,3,4,5,6,7,8,9,10,11,12])).to.exist;
  });

  it('does accept 13 digits', () => {
    expect(cnpj.checksum([1,2,3,4,5,6,7,8,9,10,11,12,13])).to.exist;
  });

  it('does not accept more than 13 digits', () => {
    expect(cnpj.checksum([0,1,2,3,4,5,6,7,8,9,10,11,12,13])).to.not.exist;
  });

  it('does not accept less than 12 digits', () => {
    expect(cnpj.checksum([1,2,3,4,5,6,7,8,9,10,11])).to.not.exist;
  });

  it('does return a checksum lower than 11', () => {
    expect(cnpj.checksum(gen.digits(12))).to.be.below(11);
  });

  it('does return a checksum bigger than or equal to 0', () => {
    expect(cnpj.checksum(gen.digits(12))).to.be.at.least(0);
  });
});

describe('CNPJ Generator', () => {
  it('does return an array', () => {
    expect(cnpj.gen()).to.be.a('array');
  });

  it('does return 14-length array', () => {
    expect(cnpj.gen().length).to.be.equal(14);
  });
});

describe('CNPJ Validator', () => {
  it('does return a boolean', () => {
    expect(val.is(cnpj, cnpj.gen())).to.be.a('boolean');
  });

  it('does return true when valid', () => {
    expect(val.is(cnpj, cnpj.gen())).to.be.true;
  });

  it('does return false when not valid', () => {
    expect(val.is(cnpj, [1,2,3,4,5,6,7,8,9,10,11,12,13,14])).to.be.false;
  });

  it('does return false when exists invalid characters', () => {
    var test = cnpj.gen();
    test.push('x');
    expect(val.is(cnpj, val.deformat(cnpj.format(test)))).to.be.false;
  });
});