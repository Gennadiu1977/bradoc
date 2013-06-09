/*
 * bragen
 * 
 *
 * Copyright (c) 2013 Jú Gonçalves
 * Licensed under the MIT license.
 */

'use strict';

var cnpj = require('./cnpj');

console.log(cnpj.checksum([1,1,4, 4, 4, 7, 7, 7, 0, 0, 0, 1, 6]));