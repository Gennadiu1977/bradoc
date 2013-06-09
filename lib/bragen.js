/*
 * bragen
 * 
 *
 * Copyright (c) 2013 Jú Gonçalves
 * Licensed under the MIT license.
 */

'use strict';

var cpf = require('./cpf-checksum');

console.log(cpf.checksum([1,1,1,4,4,4,7,7,7]));