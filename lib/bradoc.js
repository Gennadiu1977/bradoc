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