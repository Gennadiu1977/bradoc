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

var doc = function(doc){

  return {
    validate: function(number){
      number = doc.deformat(number);
      return val.is(doc,number);
    },

    generate : function(){
      return doc.format(doc.gen());
    }
  };
};

exports.cpf = doc(cpfdoc);
exports.cnpj = doc(cnpjdoc);