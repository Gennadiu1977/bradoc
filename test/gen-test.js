'use strict';

var chai = require('chai');
var expect = chai.expect;
var gen = require('../lib/gen');

describe('Random Digits Gen', function() {

  it('does return 9 digits', function() {
    expect(gen.digits(9)).to.exist;
  });

  it('does return 12 digits', function() {
    expect(gen.digits(12)).to.exist;
  });

  it('does not accept digits quantity not equal to 9 or 12', function() {
    expect(gen.digits(13)).to.not.exist;
    expect(gen.digits(11)).to.not.exist;
    expect(gen.digits(10)).to.not.exist;
    expect(gen.digits()).to.not.exist;
  });

});