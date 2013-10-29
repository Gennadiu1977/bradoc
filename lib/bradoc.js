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

exports.cpf = {

  validate : function(number){
    number = cpfdoc.deformat(number);
    return val.is(cpfdoc,number);
  },

  generate : function(){
    return cpfdoc.format(cpfdoc.gen());
  }

};

exports.cnpj = {

  validate : function(number){
    number = cnpjdoc.deformat(number);
    return val.is(cnpjdoc,number);
  },

  generate : function(){
    return cnpjdoc.format(cnpjdoc.gen());
  }

};