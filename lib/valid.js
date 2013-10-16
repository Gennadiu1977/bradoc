'use strict';

exports.is = function(doc, toval){
  if(!(toval instanceof Array) && doc.type() !== 'cpf' && doc.type !== 'cnpj'){
    return false;
  }

  var limit = doc.type() === 'cpf' ? 9 : 12;

  if(toval.length - 2 > limit || toval.length - 2 < limit){
  	return false;
  }

  var csgen = doc.genChecksum(toval.slice(0,limit));

  if(csgen[limit] === toval[limit] && csgen[limit + 1] === toval[limit + 1]){
    return true;
  }

  return false;
};