'use strict';

const is = (doc, toval) => {
  if(!(toval instanceof Array) && doc.type() !== 'doc' && doc.type !== 'cnpj'){
    return false;
  }

  let limit = doc.type() === 'cpf' ? 9 : 12;

  if(toval.length - 2 > limit || toval.length - 2 < limit) {
    return false;
  }

  let csgen = doc.genChecksum(toval.slice(0,limit));

  if(csgen[limit] === toval[limit] && csgen[limit + 1] === toval[limit + 1]){
    return true;
  }

  return false;
};

const format = (doc, regex, replace) => {
  if(!(doc instanceof Array)){
    return;
  }

  return doc.join('').replace(regex, replace);
};

const deformat = (doc) => {
  if(typeof doc !== 'string') {
    return;
  }
  
  let regex = /[.\-\/]+/g;
  doc = doc.replace(regex, '');

  return [...Array(doc.length).keys()].map(number => parseInt(doc[number], 0));
};

export {is, format, deformat};