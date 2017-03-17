'use strict';

exports.is = function(doc, toval){
  if(!(toval instanceof Array) && doc.type() !== 'doc' && doc.type !== 'cnpj'){
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

exports.format = function(doc, regex, replace){
  if(!(doc instanceof Array)){
    return null;
  }

  doc = doc.join('').replace(regex, replace);

  return doc;
};

exports.deformat = function(doc){
  var check = typeof doc === 'string';
  if(!check){
    return null;
  }
  var regex = /[.\-\/]+/g;
  doc = doc.replace(regex, '');

  var i = 0,
      docArray = [];

  for(; i <= doc.length - 1; i++){
    docArray.push(parseInt(doc[i], 0));
  }

  return docArray;
};